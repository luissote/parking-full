package com.parking.controller;
import com.parking.model.Usuario; import com.parking.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List; import java.util.Map;
@RestController @RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired private UsuarioService usuarioService;
    @GetMapping public List<Usuario> listar() { return usuarioService.listarTodos(); }
    @PostMapping public ResponseEntity<?> crear(@RequestBody Usuario u) {
        try { return ResponseEntity.ok(usuarioService.crear(u)); }
        catch (RuntimeException e) { return ResponseEntity.badRequest().body(Map.of("mensaje",e.getMessage())); }
    }
    @PutMapping("/{id}") public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Usuario u) {
        try { return ResponseEntity.ok(usuarioService.actualizar(id,u)); }
        catch (RuntimeException e) { return ResponseEntity.badRequest().body(Map.of("mensaje",e.getMessage())); }
    }
    @DeleteMapping("/{id}") public ResponseEntity<?> eliminar(@PathVariable Long id) {
        usuarioService.eliminar(id); return ResponseEntity.ok(Map.of("mensaje","Eliminado"));
    }
}
