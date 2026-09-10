package com.parking.service;
import com.parking.dto.ReservacionRequest;
import com.parking.model.*; import com.parking.repository.*;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.stereotype.Service;
import java.time.LocalDateTime; import java.util.List;
@Service
public class ReservacionService {
    @Autowired private ReservacionRepository reservacionRepository;
    @Autowired private EspacioRepository espacioRepository;

    public List<Reservacion> listarTodas() { return reservacionRepository.findAll(); }

    public Reservacion crear(ReservacionRequest req) {
        Espacio esp = espacioRepository.findById(req.getEspacioId()).orElseThrow(() -> new RuntimeException("Espacio no encontrado"));
        if (!"DISPONIBLE".equals(esp.getEstado())) throw new RuntimeException("El espacio no esta disponible");
        Reservacion r = new Reservacion();
        r.setPlaca(req.getPlaca()); r.setPropietario(req.getPropietario());
        r.setTipoVehiculo(req.getTipoVehiculo()); r.setEspacio(esp);
        r.setFechaReserva(LocalDateTime.now());
        r.setFechaInicio(LocalDateTime.parse(req.getFechaInicio()));
        r.setEstado("ACTIVA");
        esp.setEstado("RESERVADO"); espacioRepository.save(esp);
        return reservacionRepository.save(r);
    }

    public Reservacion cancelar(Long id) {
        Reservacion r = reservacionRepository.findById(id).orElseThrow(() -> new RuntimeException("No encontrada"));
        r.setEstado("CANCELADA");
        r.getEspacio().setEstado("DISPONIBLE"); espacioRepository.save(r.getEspacio());
        return reservacionRepository.save(r);
    }
}
