package com.parking.service;
import com.parking.dto.LoginRequest; import com.parking.dto.LoginResponse; import com.parking.dto.RegisterRequest;
import com.parking.model.Usuario; import com.parking.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class AuthService {
    @Autowired private UsuarioRepository usuarioRepository;

    public LoginResponse login(LoginRequest request) {
        Optional<Usuario> opt = usuarioRepository.findByEmail(request.getEmail());
        if (opt.isEmpty()) throw new RuntimeException("Correo o contrasena incorrectos");
        Usuario u = opt.get();
        if (!u.getPassword().equals(request.getPassword())) throw new RuntimeException("Correo o contrasena incorrectos");
        return new LoginResponse(u.getId(), u.getNombre(), u.getEmail(), u.getRol());
    }

    public LoginResponse registrar(RegisterRequest request) {
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent())
            throw new RuntimeException("Ya existe una cuenta con ese correo");
        Usuario u = new Usuario();
        u.setNombre(request.getNombre());
        u.setEmail(request.getEmail());
        u.setPassword(request.getPassword());
        u.setRol("OPERADOR");
        usuarioRepository.save(u);
        return new LoginResponse(u.getId(), u.getNombre(), u.getEmail(), u.getRol());
    }
}
