package com.parking.model;
import jakarta.persistence.*;
@Entity @Table(name="vehiculo")
public class Vehiculo {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(unique=true) private String placa;
    private String tipo;
    private String propietario;
    private String modelo;
    public Vehiculo() {}
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getPlaca(){return placa;} public void setPlaca(String p){this.placa=p;}
    public String getTipo(){return tipo;} public void setTipo(String t){this.tipo=t;}
    public String getPropietario(){return propietario;} public void setPropietario(String p){this.propietario=p;}
    public String getModelo(){return modelo;} public void setModelo(String m){this.modelo=m;}
}
