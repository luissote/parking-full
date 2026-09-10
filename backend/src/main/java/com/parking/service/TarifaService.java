package com.parking.service;
import com.parking.model.Tarifa; import com.parking.repository.TarifaRepository;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.stereotype.Service;
import java.util.List; import java.util.Optional;
@Service
public class TarifaService {
    @Autowired private TarifaRepository tarifaRepository;
    public List<Tarifa> listarTodas() { return tarifaRepository.findAll(); }
    public Tarifa actualizar(Long id, Tarifa datos) {
        Tarifa t = tarifaRepository.findById(id).orElseThrow(() -> new RuntimeException("Tarifa no encontrada"));
        t.setValorHora(datos.getValorHora()); return tarifaRepository.save(t);
    }
    public Optional<Tarifa> buscarPorTipo(String tipo) { return tarifaRepository.findByTipoVehiculo(tipo); }
}
