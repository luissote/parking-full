package com.parking.service;
import com.parking.model.Vehiculo; import com.parking.repository.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class VehiculoService {
    @Autowired private VehiculoRepository vehiculoRepository;
    public List<Vehiculo> listarTodos() { return vehiculoRepository.findAll(); }
    public Vehiculo guardarOActualizar(String placa, String tipo, String propietario, String modelo) {
        Vehiculo v = vehiculoRepository.findByPlaca(placa).orElse(new Vehiculo());
        v.setPlaca(placa); v.setTipo(tipo); v.setPropietario(propietario); v.setModelo(modelo);
        return vehiculoRepository.save(v);
    }
}
