package com.parking.model;
import jakarta.persistence.*;
import java.math.BigDecimal;
@Entity @Table(name="tarifa")
public class Tarifa {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(name="tipo_vehiculo",unique=true) private String tipoVehiculo;
    @Column(name="valor_hora") private BigDecimal valorHora;
    public Tarifa() {}
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getTipoVehiculo(){return tipoVehiculo;} public void setTipoVehiculo(String t){this.tipoVehiculo=t;}
    public BigDecimal getValorHora(){return valorHora;} public void setValorHora(BigDecimal v){this.valorHora=v;}
}
