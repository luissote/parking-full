package com.parking.repository;
import com.parking.model.Parqueo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
public interface ParqueoRepository extends JpaRepository<Parqueo,Long> {
    List<Parqueo> findByEstado(String estado);
    List<Parqueo> findByHoraEntradaBetween(LocalDateTime ini, LocalDateTime fin);
    List<Parqueo> findByEstadoAndHoraSalidaBetween(String estado, LocalDateTime ini, LocalDateTime fin);
}
