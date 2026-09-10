package com.parking.model;
import jakarta.persistence.*;
@Entity @Table(name="espacio")
public class Espacio {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(unique=true) private String codigo;
    private String tipo;
    private String estado;
    public Espacio() {}
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getCodigo(){return codigo;} public void setCodigo(String c){this.codigo=c;}
    public String getTipo(){return tipo;} public void setTipo(String t){this.tipo=t;}
    public String getEstado(){return estado;} public void setEstado(String e){this.estado=e;}
}
