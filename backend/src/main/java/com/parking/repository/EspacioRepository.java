package com.parking.repository;
import com.parking.model.Espacio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface EspacioRepository extends JpaRepository<Espacio,Long> {
    List<Espacio> findByEstado(String estado);
    List<Espacio> findByTipoAndEstado(String tipo, String estado);
}
