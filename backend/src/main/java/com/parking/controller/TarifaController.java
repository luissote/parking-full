package com.parking.controller;
import com.parking.model.Tarifa; import com.parking.service.TarifaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List; import java.util.Map;
@RestController @RequestMapping("/api/tarifas")
public class TarifaController {
    @Autowired private TarifaService tarifaService;
    @GetMapping public List<Tarifa> listar() { return tarifaService.listarTodas(); }
    @PutMapping("/{id}") public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Tarifa t) {
        try { return ResponseEntity.ok(tarifaService.actualizar(id,t)); }
        catch (RuntimeException e) { return ResponseEntity.badRequest().body(Map.of("mensaje",e.getMessage())); }
    }
}
