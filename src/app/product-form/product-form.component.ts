import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { NgxPaginationModule } from 'ngx-pagination';
import * as XLSX from 'xlsx'; // Importar la librería XLSX
import { ProductService } from '../services/productos.service';
import { Producto } from './../model/productInterface';

@Component({
  selector: 'app-product-form',
  imports: [RouterModule, NgxPaginationModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export default class ProductFormComponent implements OnInit {
  private productoService = inject(ProductService)
  itemsPerPage = 5; // Número de elementos por página
  currentPage = 1;  // Página actual
  totalPages = 0;
  filteredproducto: Producto[] = [];
  productos: Producto[] = [];
  searchQuery = '';

  ngOnInit(): void {
    this.loadAll();
  }
  productoPaginated() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredproducto.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('productosTable'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'productos');
    XLSX.writeFile(wb, 'productos.xlsx');
  }

  exportToPDF() {
    const data = document.getElementById('productosTable');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();
        doc.addImage(imgData, 'PNG', 10, 10, 180, 160);
        doc.save('producto.pdf');
      });
    }
  }
  loadAll() {
    this.productoService.listar()

      .subscribe(productos => {
        this.productos = productos;
        this.filteredproducto = [...this.productos];
        this.totalPages = Math.ceil(this.filteredproducto.length / this.itemsPerPage);
      });
  }
  filterClientes() {
    this.filteredproducto = this.productos.filter(cliente =>
      Object.values(cliente).some(value => value.toString().toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
    this.totalPages = Math.ceil(this.filteredproducto.length / this.itemsPerPage);
  }
    deleteProducto(producto: Producto) {
      this.productoService.delete(producto.idProducto)
        .subscribe(() => {
          this.loadAll();
          console.log("Cliente eliminado correctamente");
        });
    }

}
