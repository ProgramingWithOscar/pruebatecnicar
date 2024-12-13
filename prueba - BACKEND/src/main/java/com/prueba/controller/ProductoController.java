package com.prueba.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.prueba.entity.Producto;
import com.prueba.repository.ProductoRepository;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductoController {

    @Autowired
    private ProductoRepository productoService;

    @GetMapping("/list-products")
    public Iterable<Producto> getAllProductos() {
        return productoService.findAll();
    }

    
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Producto createProducto(@RequestBody Producto producto) {
        return productoService.save(producto);
    }

    @PutMapping("/{id}")
    public Producto updateProducto(@PathVariable Integer id, @RequestBody Producto producto) {
        producto.setIdProducto(id);
        return productoService.save(producto);
    }

    @DeleteMapping("/{id}")
    public void deleteProducto(@PathVariable Integer id) {
        Producto productoFromDb = productoService.findById(id).orElse(null);
        productoService.delete(productoFromDb);
    }
    @GetMapping("{idProducto}")
    public Producto get(@PathVariable Integer idProducto) {
        return productoService.findById(idProducto)
        .orElse(null);
    }
}
