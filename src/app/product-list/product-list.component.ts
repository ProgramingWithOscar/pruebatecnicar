import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Producto } from '../model/productInterface';
import { ProductService } from '../services/productos.service';

@Component({
  selector: 'app-product-list',
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export default class ProductListComponent implements OnInit {
  private fb = inject(FormBuilder);
    private ProductService = inject(ProductService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    form?: FormGroup;
    producto?: Producto;

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      console.log('id', id);

      if (id) {
        this.ProductService.get(parseInt(id))
          .subscribe(producto => {
            this.producto =producto;
            this.initializeForm(producto);
          });
      } else {
        this.initializeForm();
      }
    }

    // Método para inicializar el formulario
    private initializeForm(producto?: Producto): void {
      this.form = this.fb.group({
        nombre: [producto?.nombre || '', [Validators.required]],
        precio: [producto?.precio || '', [Validators.required]],
        stock: [producto?.stock || '', [Validators.required]]
      });
    }


    // Método para verificar si un campo es inválido
    isFieldInvalid(fieldName: string): boolean {
      const field = this.form?.get(fieldName);
      return !!field && field.invalid && field.touched;
    }

    // Método para guardar
    guardar(): void {
      if (this.form?.invalid) {
        this.form.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
        return;
      }

      const productForm = this.form?.value;
      console.log(productForm);
      if (this.producto) {
        this.ProductService.update(this.producto.idProducto, productForm)
          .subscribe(() => {
            this.router.navigate(['products']);
          });
      } else {
        this.ProductService.create(productForm)
          .subscribe(() => {
            this.router.navigate(['products']);
          });
      }
    }

}
