package com.parking.controller;
import com.parking.model.Vehiculo; import com.parking.service.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/vehiculos")
public class VehiculoController {
    @Autowired private VehiculoService vehiculoService;
    @GetMapping public List<Vehiculo> listar() { return vehiculoService.listarTodos(); }
}
