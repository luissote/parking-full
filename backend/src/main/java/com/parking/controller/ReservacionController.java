package com.parking.controller;
import com.parking.dto.ReservacionRequest; import com.parking.model.Reservacion; import com.parking.service.ReservacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List; import java.util.Map;
@RestController @RequestMapping("/api/reservaciones")
public class ReservacionController {
    @Autowired private ReservacionService reservacionService;
    @GetMapping public List<Reservacion> listar() { return reservacionService.listarTodas(); }
    @PostMapping public ResponseEntity<?> crear(@RequestBody ReservacionRequest req) {
        try { return ResponseEntity.ok(reservacionService.crear(req)); }
        catch (RuntimeException e) { return ResponseEntity.badRequest().body(Map.of("mensaje",e.getMessage())); }
    }
    @PutMapping("/{id}/cancelar") public ResponseEntity<?> cancelar(@PathVariable Long id) {
        try { return ResponseEntity.ok(reservacionService.cancelar(id)); }
        catch (RuntimeException e) { return ResponseEntity.badRequest().body(Map.of("mensaje",e.getMessage())); }
    }
}
