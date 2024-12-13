package com.prueba.entity;


import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Factura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer numFactura;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = true)
    private Cliente id_cliente;

    @Column(nullable = true)
    private Date fecha;

    @ManyToOne
    @JoinColumn(name = "idProducto", nullable = true)
    private Producto id_producto;  // Relación con productos

}
