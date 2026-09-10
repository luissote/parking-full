package com.parking.controller;
import com.parking.dto.*; import com.parking.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController @RequestMapping("/api/auth")
public class AuthController {
    @Autowired private AuthService authService;
    @PostMapping("/login") public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try { return ResponseEntity.ok(authService.login(req)); }
        catch (RuntimeException e) { return ResponseEntity.status(401).body(Map.of("mensaje",e.getMessage())); }
    }
    @PostMapping("/registro") public ResponseEntity<?> registro(@RequestBody RegisterRequest req) {
        try { return ResponseEntity.ok(authService.registrar(req)); }
        catch (RuntimeException e) { return ResponseEntity.badRequest().body(Map.of("mensaje",e.getMessage())); }
    }
}
