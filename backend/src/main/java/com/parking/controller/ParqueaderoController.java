package com.parking.controller;
import com.parking.model.Parqueadero; import com.parking.service.ParqueaderoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List; import java.util.Map;
@RestController @RequestMapping("/api/parqueaderos")
public class ParqueaderoController {
    @Autowired private ParqueaderoService parqueaderoService;
    @GetMapping public List<Parqueadero> listar() { return parqueaderoService.listarTodos(); }
    @PutMapping("/{id}") public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Parqueadero p) {
        try { return ResponseEntity.ok(parqueaderoService.actualizar(id,p)); }
        catch (RuntimeException e) { return ResponseEntity.badRequest().body(Map.of("mensaje",e.getMessage())); }
    }
}
