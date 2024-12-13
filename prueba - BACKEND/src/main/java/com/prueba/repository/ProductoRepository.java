package com.prueba.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.prueba.entity.Producto;

@Repository
public interface ProductoRepository extends CrudRepository<Producto,Integer> {

    
} 

