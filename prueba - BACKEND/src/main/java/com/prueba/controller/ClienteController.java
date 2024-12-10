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

import com.prueba.entity.Cliente;
import com.prueba.repository.ClienteRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    @Autowired
    private ClienteRepository clienteRepository;


    @GetMapping("/list")
    Iterable<Cliente> list() {
        return clienteRepository.findAll();
    }

    @GetMapping("{id_cliente}")
    public Cliente get(@PathVariable Integer id_cliente) {
        return clienteRepository.findById(id_cliente)
        .orElse(null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Cliente create(@RequestBody Cliente cliente) {

        return clienteRepository.save(cliente);
    }

    @PutMapping("{id}")
    public Cliente update(@PathVariable Integer id, @RequestBody Cliente cliente) {
        Cliente clienteFromDb = clienteRepository.findById(id).orElse(null);

        clienteFromDb.setNombre(cliente.getNombre());
        clienteFromDb.setApellido(cliente.getApellido());
        clienteFromDb.setEmail(cliente.getEmail());
        return clienteRepository.save(cliente);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) {
        Cliente clienteFromDb = clienteRepository.findById(id).orElse(null);

     
         clienteRepository.delete(clienteFromDb);
    }

}
