package com.parking.service;
import com.parking.model.Usuario; import com.parking.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired; import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class UsuarioService {
    @Autowired private UsuarioRepository usuarioRepository;
    public List<Usuario> listarTodos() { return usuarioRepository.findAll(); }
    public Usuario crear(Usuario u) {
        if (usuarioRepository.findByEmail(u.getEmail()).isPresent())
            throw new RuntimeException("Ya existe un usuario con ese correo");
        return usuarioRepository.save(u);
    }
    public Usuario actualizar(Long id, Usuario datos) {
        Usuario u = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        u.setNombre(datos.getNombre()); u.setRol(datos.getRol());
        if (datos.getPassword() != null && !datos.getPassword().isEmpty()) u.setPassword(datos.getPassword());
        return usuarioRepository.save(u);
    }
    public void eliminar(Long id) { usuarioRepository.deleteById(id); }
}
