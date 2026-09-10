package com.parking.service;
import com.parking.model.*; import com.parking.repository.*;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.stereotype.Service;
import java.math.BigDecimal; import java.time.*; import java.time.format.TextStyle;
import java.util.*; import java.util.stream.Collectors;
@Service
public class DashboardService {
    @Autowired private EspacioRepository espacioRepository;
    @Autowired private ParqueoRepository parqueoRepository;

    public Map<String,Object> obtenerResumen() {
        Map<String,Object> res = new LinkedHashMap<>();
        List<Espacio> espacios = espacioRepository.findAll();
        res.put("espaciosTotal", espacios.size());
        res.put("espaciosDisponibles", espacios.stream().filter(e->"DISPONIBLE".equals(e.getEstado())).count());
        res.put("espaciosOcupados", espacios.stream().filter(e->"OCUPADO".equals(e.getEstado())).count());
        res.put("espaciosReservados", espacios.stream().filter(e->"RESERVADO".equals(e.getEstado())).count());
        LocalDateTime inicioHoy = LocalDate.now().atStartOfDay();
        LocalDateTime finHoy = inicioHoy.plusDays(1);
        List<Parqueo> finalizadosHoy = parqueoRepository.findByEstadoAndHoraSalidaBetween("FINALIZADO",inicioHoy,finHoy);
        BigDecimal ingresosHoy = finalizadosHoy.stream().map(Parqueo::getValorPagado).filter(v->v!=null).reduce(BigDecimal.ZERO,BigDecimal::add);
        res.put("ingresosHoy", ingresosHoy);
        res.put("vehiculosHoy", parqueoRepository.findByHoraEntradaBetween(inicioHoy,finHoy).size());
        res.put("vehiculosActivos", parqueoRepository.findByEstado("ACTIVO").size());
        Map<String,BigDecimal> ingresos7 = new LinkedHashMap<>();
        for (int i=6;i>=0;i--) {
            LocalDate d = LocalDate.now().minusDays(i);
            List<Parqueo> del = parqueoRepository.findByEstadoAndHoraSalidaBetween("FINALIZADO",d.atStartOfDay(),d.atStartOfDay().plusDays(1));
            BigDecimal tot = del.stream().map(Parqueo::getValorPagado).filter(v->v!=null).reduce(BigDecimal.ZERO,BigDecimal::add);
            ingresos7.put(d.getDayOfWeek().getDisplayName(TextStyle.SHORT,new Locale("es")),tot);
        }
        res.put("ingresosUltimos7Dias",ingresos7);
        return res;
    }
}
