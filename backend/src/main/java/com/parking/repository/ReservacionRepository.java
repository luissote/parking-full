package com.parking.repository;
import com.parking.model.Reservacion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ReservacionRepository extends JpaRepository<Reservacion,Long> {
    List<Reservacion> findByEstado(String estado);
}
