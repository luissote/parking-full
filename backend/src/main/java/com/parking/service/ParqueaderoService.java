package com.parking.service;
import com.parking.model.Parqueadero; import com.parking.repository.ParqueaderoRepository;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ParqueaderoService {
    @Autowired private ParqueaderoRepository parqueaderoRepository;
    public List<Parqueadero> listarTodos() { return parqueaderoRepository.findAll(); }
    public Parqueadero actualizar(Long id, Parqueadero datos) {
        Parqueadero p = parqueaderoRepository.findById(id).orElseThrow(() -> new RuntimeException("No encontrado"));
        p.setNombre(datos.getNombre()); p.setDireccion(datos.getDireccion());
        p.setTelefono(datos.getTelefono()); p.setCapacidad(datos.getCapacidad());
        return parqueaderoRepository.save(p);
    }
}
