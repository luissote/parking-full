package com.parking.service;
import com.parking.dto.EntradaRequest;
import com.parking.model.*; import com.parking.repository.*;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.stereotype.Service;
import java.math.BigDecimal; import java.math.RoundingMode;
import java.time.Duration; import java.time.LocalDateTime; import java.util.List;
@Service
public class ParqueoService {
    @Autowired private ParqueoRepository parqueoRepository;
    @Autowired private EspacioRepository espacioRepository;
    @Autowired private VehiculoService vehiculoService;
    @Autowired private TarifaService tarifaService;

    public List<Parqueo> listarActivos() { return parqueoRepository.findByEstado("ACTIVO"); }
    public List<Parqueo> listarTodos() { return parqueoRepository.findAll(); }

    public Parqueo registrarEntrada(EntradaRequest req) {
        Espacio esp = espacioRepository.findById(req.getEspacioId()).orElseThrow(() -> new RuntimeException("Espacio no encontrado"));
        if (!"DISPONIBLE".equals(esp.getEstado())) throw new RuntimeException("El espacio seleccionado no esta disponible");
        Vehiculo v = vehiculoService.guardarOActualizar(req.getPlaca(), req.getTipo(), req.getPropietario(), req.getModelo());
        Parqueo p = new Parqueo();
        p.setVehiculo(v); p.setEspacio(esp); p.setHoraEntrada(LocalDateTime.now()); p.setEstado("ACTIVO");
        esp.setEstado("OCUPADO"); espacioRepository.save(esp);
        return parqueoRepository.save(p);
    }

    public Parqueo registrarSalida(Long id) {
        Parqueo p = parqueoRepository.findById(id).orElseThrow(() -> new RuntimeException("Parqueo no encontrado"));
        if ("FINALIZADO".equals(p.getEstado())) throw new RuntimeException("Este vehiculo ya registro su salida");
        LocalDateTime salida = LocalDateTime.now();
        p.setHoraSalida(salida); p.setEstado("FINALIZADO");
        Tarifa t = tarifaService.buscarPorTipo(p.getVehiculo().getTipo()).orElseThrow(() -> new RuntimeException("Tarifa no encontrada"));
        long mins = Duration.between(p.getHoraEntrada(), salida).toMinutes();
        long horas = Math.max(1, (long) Math.ceil(mins / 60.0));
        p.setValorPagado(t.getValorHora().multiply(BigDecimal.valueOf(horas)).setScale(0, RoundingMode.HALF_UP));
        p.getEspacio().setEstado("DISPONIBLE"); espacioRepository.save(p.getEspacio());
        return parqueoRepository.save(p);
    }
}
