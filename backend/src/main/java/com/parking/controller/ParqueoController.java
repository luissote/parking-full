package com.parking.controller;
import com.parking.dto.EntradaRequest; import com.parking.model.Parqueo; import com.parking.service.ParqueoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List; import java.util.Map;
@RestController @RequestMapping("/api/parqueos")
public class ParqueoController {
    @Autowired private ParqueoService parqueoService;
    @GetMapping("/activos") public List<Parqueo> activos() { return parqueoService.listarActivos(); }
    @GetMapping public List<Parqueo> todos() { return parqueoService.listarTodos(); }
    @PostMapping("/entrada") public ResponseEntity<?> entrada(@RequestBody EntradaRequest req) {
        try { return ResponseEntity.ok(parqueoService.registrarEntrada(req)); }
        catch (RuntimeException e) { return ResponseEntity.badRequest().body(Map.of("mensaje",e.getMessage())); }
    }
    @PutMapping("/{id}/salida") public ResponseEntity<?> salida(@PathVariable Long id) {
        try { return ResponseEntity.ok(parqueoService.registrarSalida(id)); }
        catch (RuntimeException e) { return ResponseEntity.badRequest().body(Map.of("mensaje",e.getMessage())); }
    }
}
