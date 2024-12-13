package com.prueba.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.prueba.entity.Factura;
import com.prueba.repository.FacturaRepository;

@CrossOrigin
@RestController

@RequestMapping("/api/facturas")
public class FacturaController {

    @Autowired
    private FacturaRepository facturaRepository;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Factura guardarFactura(@RequestBody Factura factura) {
        return facturaRepository.save(factura);
    }
}
