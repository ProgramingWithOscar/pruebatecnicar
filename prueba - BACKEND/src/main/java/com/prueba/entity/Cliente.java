package com.prueba.entity;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor

public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO )
    private Integer id_cliente;

    @NonNull
    private String nombre;

    @NonNull
    private String apellidos;

    @NonNull
    private String email;

    private String direccion;
    private String fecha_nacimiento;
    private String telefono;

    private String categoria;

   
    public Cliente(String nombre, String apellidos, String email) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
    }
}
