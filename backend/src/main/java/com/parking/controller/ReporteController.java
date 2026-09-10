package com.parking.controller;
import com.parking.model.Parqueo; import com.parking.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal; import java.time.*; import java.util.*;
@RestController @RequestMapping("/api/reportes")
public class ReporteController {
    @Autowired private ParqueoRepository parqueoRepository;
    @Autowired private EspacioRepository espacioRepository;
    @GetMapping("/resumen") public Map<String,Object> resumen() {
        Map<String,Object> d = new LinkedHashMap<>();
        List<Parqueo> todos = parqueoRepository.findAll();
        BigDecimal total = todos.stream().filter(p->p.getValorPagado()!=null).map(Parqueo::getValorPagado).reduce(BigDecimal.ZERO,BigDecimal::add);
        d.put("totalRecaudado",total);
        d.put("totalVehiculos",todos.size());
        d.put("carros",todos.stream().filter(p->"CARRO".equals(p.getVehiculo().getTipo())).count());
        d.put("motos",todos.stream().filter(p->"MOTO".equals(p.getVehiculo().getTipo())).count());
        d.put("espaciosDisponibles",espacioRepository.findByEstado("DISPONIBLE").size());
        d.put("espaciosOcupados",espacioRepository.findByEstado("OCUPADO").size());
        d.put("espaciosReservados",espacioRepository.findByEstado("RESERVADO").size());
        Map<String,BigDecimal> i30 = new LinkedHashMap<>();
        for (int i=29;i>=0;i--) {
            LocalDate dia = LocalDate.now().minusDays(i);
            List<Parqueo> del = parqueoRepository.findByEstadoAndHoraSalidaBetween("FINALIZADO",dia.atStartOfDay(),dia.atStartOfDay().plusDays(1));
            BigDecimal t2 = del.stream().map(Parqueo::getValorPagado).filter(v->v!=null).reduce(BigDecimal.ZERO,BigDecimal::add);
            i30.put(dia.getDayOfMonth()+"/"+dia.getMonthValue(),t2);
        }
        d.put("ingresos30Dias",i30);
        return d;
    }
}
