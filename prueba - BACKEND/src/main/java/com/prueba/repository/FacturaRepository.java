package com.prueba.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.prueba.entity.Factura;

@Repository
public interface FacturaRepository extends CrudRepository<Factura, Integer> {
}
