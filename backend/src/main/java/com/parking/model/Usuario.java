package com.parking.model;
import jakarta.persistence.*;
@Entity @Table(name="usuario")
public class Usuario {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    private String nombre;
    @Column(unique=true) private String email;
    private String password;
    private String rol;
    public Usuario() {}
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getNombre(){return nombre;} public void setNombre(String n){this.nombre=n;}
    public String getEmail(){return email;} public void setEmail(String e){this.email=e;}
    public String getPassword(){return password;} public void setPassword(String p){this.password=p;}
    public String getRol(){return rol;} public void setRol(String r){this.rol=r;}
}
