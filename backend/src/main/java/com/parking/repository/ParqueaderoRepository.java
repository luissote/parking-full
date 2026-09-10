package com.parking.repository;
import com.parking.model.Parqueadero;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ParqueaderoRepository extends JpaRepository<Parqueadero,Long> {}
