package com.parking.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity @Table(name="reservacion")
public class Reservacion {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    private String placa;
    private String propietario;
    private String tipoVehiculo;
    @ManyToOne @JoinColumn(name="espacio_id") private Espacio espacio;
    @Column(name="fecha_reserva") private LocalDateTime fechaReserva;
    @Column(name="fecha_inicio") private LocalDateTime fechaInicio;
    private String estado;
    public Reservacion() {}
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getPlaca(){return placa;} public void setPlaca(String p){this.placa=p;}
    public String getPropietario(){return propietario;} public void setPropietario(String p){this.propietario=p;}
    public String getTipoVehiculo(){return tipoVehiculo;} public void setTipoVehiculo(String t){this.tipoVehiculo=t;}
    public Espacio getEspacio(){return espacio;} public void setEspacio(Espacio e){this.espacio=e;}
    public LocalDateTime getFechaReserva(){return fechaReserva;} public void setFechaReserva(LocalDateTime f){this.fechaReserva=f;}
    public LocalDateTime getFechaInicio(){return fechaInicio;} public void setFechaInicio(LocalDateTime f){this.fechaInicio=f;}
    public String getEstado(){return estado;} public void setEstado(String e){this.estado=e;}
}
