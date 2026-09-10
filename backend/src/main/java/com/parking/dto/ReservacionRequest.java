package com.parking.dto;
public class ReservacionRequest {
    private String placa; private String propietario; private String tipoVehiculo; private Long espacioId; private String fechaInicio;
    public String getPlaca(){return placa;} public void setPlaca(String p){this.placa=p;}
    public String getPropietario(){return propietario;} public void setPropietario(String p){this.propietario=p;}
    public String getTipoVehiculo(){return tipoVehiculo;} public void setTipoVehiculo(String t){this.tipoVehiculo=t;}
    public Long getEspacioId(){return espacioId;} public void setEspacioId(Long e){this.espacioId=e;}
    public String getFechaInicio(){return fechaInicio;} public void setFechaInicio(String f){this.fechaInicio=f;}
}
