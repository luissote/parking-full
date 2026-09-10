package com.parking.dto;
public class RegisterRequest {
    private String nombre; private String email; private String password;
    public String getNombre(){return nombre;} public void setNombre(String n){this.nombre=n;}
    public String getEmail(){return email;} public void setEmail(String e){this.email=e;}
    public String getPassword(){return password;} public void setPassword(String p){this.password=p;}
}
