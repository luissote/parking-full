package com.parking.repository;
import com.parking.model.Tarifa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface TarifaRepository extends JpaRepository<Tarifa,Long> {
    Optional<Tarifa> findByTipoVehiculo(String tipo);
}
