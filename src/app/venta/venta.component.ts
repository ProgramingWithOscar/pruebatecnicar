import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Cliente } from '../model/clienteInterface';
import { Producto } from '../model/productInterface';
import { ClientesService } from '../services/clientes.service';
import { FacturaService } from '../services/factura.service';
import { ProductService } from '../services/productos.service';

@Component({
  selector: 'app-venta',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export default class VentaComponent implements OnInit {
  private productoService = inject(ProductService);
  itemsPerPage = 5; // Número de elementos por página
  currentPage = 1;  // Página actual
  totalPages = 0;
  filteredproducto: Producto[] = [];
  productos: Producto[] = [];
  clientes: Cliente[] = [];
  filteredClientes: Cliente[] = [];
  private facturaService = inject(FacturaService);  // Inyecta el servicio

  private clienteService = inject(ClientesService);

  ngOnInit(): void {
    this.loadAllClientes();
    this.loadAllProducts();
    this.initializeForm();
  }

  loadAllClientes() {
    this.clienteService.listar().subscribe(clientes => {
      this.clientes = clientes;
      this.filteredClientes = [...this.clientes];
      this.totalPages = Math.ceil(this.filteredClientes.length / this.itemsPerPage);
    });
  }

  loadAllProducts() {
    this.productoService.listar().subscribe(productos => {
      this.productos = productos;
      this.filteredproducto = [...this.productos];
      this.totalPages = Math.ceil(this.filteredproducto.length / this.itemsPerPage);
    });
  }

  clienteSeleccionado: any;
  productoSeleccionado: any;
  cantidad: number = 1;
  productosSeleccionados: any[] = [];
  totalVenta: number = 0;
  ventaGenerada: boolean = false;
  fecha: Date = new Date();
    form?: FormGroup;
  private fb = inject(FormBuilder);

  agregarProducto() {
    if (this.productoSeleccionado && this.cantidad > 0) {
      const producto = this.productoSeleccionado;
      const cantidad = this.cantidad;

      const productoExistente = this.productosSeleccionados.find(item => item.producto.idProducto === producto.idProducto);
      if (productoExistente) {
        productoExistente.cantidad += cantidad; // Si existe, solo incrementamos la cantidad
      } else {
        this.productosSeleccionados.push({ producto, cantidad });
        console.log(this.productoSeleccionado)
      }

      this.restablecerProducto();
      this.calcularTotalVenta();
    }
  }

  eliminarProducto(index: number) {
    this.productosSeleccionados.splice(index, 1);
    this.calcularTotalVenta();
  }

  // Método para restablecer la selección del producto y la cantidad
  restablecerProducto() {
    this.productoSeleccionado = null;
    this.cantidad = 1;
  }

  // Método para calcular el total de la venta
  calcularTotalVenta() {
    this.totalVenta = this.productosSeleccionados.reduce((total, item) => {
      return total + (item.cantidad * item.producto.precio);
    }, 0);
  }

  private initializeForm(producto?: Producto): void {
    this.form = this.fb.group({
      nombre: [producto?.nombre || '', [Validators.required]],
      id_cliente: [this.clienteSeleccionado.id_cliente || '', [Validators.required]],
      stock: [this.productosSeleccionados[0]?.producto?.idProducto || null || '', [Validators.required]]
    });
  }
  // Método para agregar la venta
  agregarVenta() {
    if (this.productosSeleccionados.length > 0 && this.clienteSeleccionado) {
      this.ventaGenerada = true;
      this.calcularTotalVenta();
      const productForm = this.form?.value;

      // // Crear el objeto factura
      // const factura: Factura = {
      //   num_factura: this.generarNumFactura(),
      //   id_cliente: this.clienteSeleccionado.id_cliente,
      //   id_producto: this.productosSeleccionados[0]?.producto?.idProducto || null
      //   // Asegúrate de que la propiedad sea correcta
      // };
      // console.log(this.clienteSeleccionado.id_cliente)
      // console.log( this.productosSeleccionados[0]?.producto?.idProducto || null
      // )
      // console.log(factura)

      this.facturaService.create(productForm).subscribe({
        next: (respuesta) => {
          console.log('Factura guardada exitosamente:', respuesta);
        },
        error: (error) => {
          console.error('Error al guardar la factura:', error);
        }
      });
    }
  }

  // Método para generar un número de factura (esto puede adaptarse según tu lógica)
  generarNumFactura(): number {
    return Math.floor(Math.random() * 1000000);  // Esto es solo un ejemplo
  }

  // Método para imprimir la factura
  imprimirFactura() {
    const printContents = document.getElementById('factura')?.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents || '';
    window.print();
    document.body.innerHTML = originalContents;
  }

}
