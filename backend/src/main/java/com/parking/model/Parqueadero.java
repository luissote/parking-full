package com.parking.model;
import jakarta.persistence.*;
@Entity @Table(name="parqueadero")
public class Parqueadero {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    private String nombre;
    private String direccion;
    private String telefono;
    private Integer capacidad;
    public Parqueadero() {}
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getNombre(){return nombre;} public void setNombre(String n){this.nombre=n;}
    public String getDireccion(){return direccion;} public void setDireccion(String d){this.direccion=d;}
    public String getTelefono(){return telefono;} public void setTelefono(String t){this.telefono=t;}
    public Integer getCapacidad(){return capacidad;} public void setCapacidad(Integer c){this.capacidad=c;}
}
