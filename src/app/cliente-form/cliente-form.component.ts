import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cliente } from '../model/clienteInterface';
import { ClientesService } from './../services/clientes.service';

@Component({
  selector: 'app-cliente-form',
  imports: [
    RouterModule, ReactiveFormsModule, CommonModule
  ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export default class ClienteFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private ClientesService = inject(ClientesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  cliente?: Cliente;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id', id);

    if (id) {
      this.ClientesService.get(parseInt(id))
        .subscribe(cliente => {
          this.cliente = cliente;
          this.initializeForm(cliente);
        });
    } else {
      this.initializeForm();
    }
  }

  // Método para inicializar el formulario
  private initializeForm(cliente?: Cliente): void {
    this.form = this.fb.group({
      nombre: [cliente?.nombre || '', [Validators.required]],
      apellidos: [cliente?.apellidos || '', [Validators.required]],
      email: [cliente?.email || '', [Validators.required, Validators.email]]
    });
  }

  // Método para verificar si un campo es inválido
  isFieldInvalid(fieldName: string): boolean {
    const field = this.form?.get(fieldName);
    return !!field && field.invalid && field.touched;
  }

  // Método para guardar
  save(): void {

    const clienteForm = this.form?.value;

    if (this.cliente?.id_cliente) {
      // Actualizar cliente existente
      console.log('Actualizando cliente:', this.cliente.id_cliente);
      this.ClientesService.update(this.cliente.id_cliente, clienteForm)
        .subscribe({
          next: () => {
            console.log('Cliente actualizado correctamente');
            this.router.navigate(['list']);
          },
          error: (err) => console.error('Error al actualizar cliente:', err),
        });
    } else {
      // Crear nuevo cliente
      console.log('Creando nuevo cliente');
      this.ClientesService.create(clienteForm)
        .subscribe({
          next: () => {
            console.log('Cliente creado correctamente');
            this.router.navigate(['list']);
          },
          error: (err) => console.error('Error al crear cliente:', err),
        });
    }
  }


}
