package com.parking.controller;
import com.parking.model.Espacio; import com.parking.service.EspacioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List; import java.util.Map;
@RestController @RequestMapping("/api/espacios")
public class EspacioController {
    @Autowired private EspacioService espacioService;
    @GetMapping public List<Espacio> listar() { return espacioService.listarTodos(); }
    @GetMapping("/disponibles") public List<Espacio> disponibles() { return espacioService.listarDisponibles(); }
    @PostMapping public ResponseEntity<?> crear(@RequestBody Espacio e) {
        try { return ResponseEntity.ok(espacioService.crear(e)); }
        catch (Exception ex) { return ResponseEntity.badRequest().body(Map.of("mensaje",ex.getMessage())); }
    }
    @PutMapping("/{id}") public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Espacio e) {
        try { return ResponseEntity.ok(espacioService.actualizar(id,e)); }
        catch (RuntimeException ex) { return ResponseEntity.badRequest().body(Map.of("mensaje",ex.getMessage())); }
    }
    @PutMapping("/{id}/estado") public ResponseEntity<?> estado(@PathVariable Long id, @RequestBody Map<String,String> body) {
        try { espacioService.cambiarEstado(id,body.get("estado")); return ResponseEntity.ok(Map.of("mensaje","OK")); }
        catch (RuntimeException ex) { return ResponseEntity.badRequest().body(Map.of("mensaje",ex.getMessage())); }
    }
    @DeleteMapping("/{id}") public ResponseEntity<?> eliminar(@PathVariable Long id) {
        espacioService.eliminar(id); return ResponseEntity.ok(Map.of("mensaje","Eliminado"));
    }
}
