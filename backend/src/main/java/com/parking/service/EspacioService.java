package com.parking.service;
import com.parking.model.Espacio; import com.parking.repository.EspacioRepository;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class EspacioService {
    @Autowired private EspacioRepository espacioRepository;
    public List<Espacio> listarTodos() { return espacioRepository.findAll(); }
    public List<Espacio> listarDisponibles() { return espacioRepository.findByEstado("DISPONIBLE"); }
    public Espacio crear(Espacio e) { if (e.getEstado()==null) e.setEstado("DISPONIBLE"); return espacioRepository.save(e); }
    public Espacio actualizar(Long id, Espacio datos) {
        Espacio e = espacioRepository.findById(id).orElseThrow(() -> new RuntimeException("Espacio no encontrado"));
        e.setCodigo(datos.getCodigo()); e.setTipo(datos.getTipo()); e.setEstado(datos.getEstado());
        return espacioRepository.save(e);
    }
    public void eliminar(Long id) { espacioRepository.deleteById(id); }
    public void cambiarEstado(Long id, String estado) {
        Espacio e = espacioRepository.findById(id).orElseThrow(() -> new RuntimeException("Espacio no encontrado"));
        e.setEstado(estado); espacioRepository.save(e);
    }
}
