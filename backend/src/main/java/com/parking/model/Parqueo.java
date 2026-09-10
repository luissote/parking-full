package com.parking.model;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity @Table(name="parqueo")
public class Parqueo {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @ManyToOne @JoinColumn(name="vehiculo_id") private Vehiculo vehiculo;
    @ManyToOne @JoinColumn(name="espacio_id") private Espacio espacio;
    @Column(name="hora_entrada") private LocalDateTime horaEntrada;
    @Column(name="hora_salida") private LocalDateTime horaSalida;
    @Column(name="valor_pagado") private BigDecimal valorPagado;
    private String estado;
    public Parqueo() {}
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public Vehiculo getVehiculo(){return vehiculo;} public void setVehiculo(Vehiculo v){this.vehiculo=v;}
    public Espacio getEspacio(){return espacio;} public void setEspacio(Espacio e){this.espacio=e;}
    public LocalDateTime getHoraEntrada(){return horaEntrada;} public void setHoraEntrada(LocalDateTime h){this.horaEntrada=h;}
    public LocalDateTime getHoraSalida(){return horaSalida;} public void setHoraSalida(LocalDateTime h){this.horaSalida=h;}
    public BigDecimal getValorPagado(){return valorPagado;} public void setValorPagado(BigDecimal v){this.valorPagado=v;}
    public String getEstado(){return estado;} public void setEstado(String e){this.estado=e;}
}
