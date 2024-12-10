package com.prueba;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.prueba.entity.Cliente;
import com.prueba.repository.ClienteRepository;

@SpringBootApplication
public class PruebaApplication {

	public static void main(String[] args) {
		SpringApplication.run(PruebaApplication.class, args);



	}
	@Bean
	CommandLineRunner runner (ClienteRepository clienteRepository) {
		return args -> {
				List<Cliente> clientes = Arrays.asList(
			new Cliente("Oscar","Poveda","oscar@gmail.com"),
			new Cliente("Oscar","Poveda","oscar@gmail.com"),
			new Cliente("Oscar","Poveda","oscar@gmail.com"),
			new Cliente("Oscar","Poveda","oscar@gmail.com"),
			new Cliente("Oscar","Poveda","oscar@gmail.com")
			
		);

		clienteRepository.saveAll(clientes);
			
		};
	}

}
