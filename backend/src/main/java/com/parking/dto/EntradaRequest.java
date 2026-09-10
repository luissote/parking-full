package com.parking.dto;
public class EntradaRequest {
    private String placa; private String tipo; private String propietario; private String modelo; private Long espacioId;
    public String getPlaca(){return placa;} public void setPlaca(String p){this.placa=p;}
    public String getTipo(){return tipo;} public void setTipo(String t){this.tipo=t;}
    public String getPropietario(){return propietario;} public void setPropietario(String p){this.propietario=p;}
    public String getModelo(){return modelo;} public void setModelo(String m){this.modelo=m;}
    public Long getEspacioId(){return espacioId;} public void setEspacioId(Long e){this.espacioId=e;}
}
