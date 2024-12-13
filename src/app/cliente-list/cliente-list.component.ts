import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { NgxPaginationModule } from 'ngx-pagination';
import * as XLSX from 'xlsx'; // Importar la librería XLSX
import { ClientesService } from '../services/clientes.service';
import { Cliente } from './../model/clienteInterface';
@Component({
  selector: 'app-cliente-list',
  imports: [
    RouterModule,
    NgxPaginationModule
  ],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export default class ClienteListComponent implements OnInit {
  private clienteService = inject(ClientesService);
  itemsPerPage = 5; // Número de elementos por página
  currentPage = 1;  // Página actual
  totalPages = 0;   // Total de páginas
  clientes: Cliente[] = []; // Lista completa de clientes
  filteredClientes: Cliente[] = [];
  sortColumn: keyof Cliente = 'id_cliente';
  sortDirection = true;
  searchQuery = '';

  ngOnInit(): void {
    this.loadAll();
  }

  clientesPaginated() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredClientes.slice(start, end);
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

  loadAll() {
    this.clienteService.listar()
      .subscribe(clientes => {
        this.clientes = clientes;
        this.filteredClientes = [...this.clientes];
        this.totalPages = Math.ceil(this.filteredClientes.length / this.itemsPerPage);
      });
  }

  deleteCliente(cliente: Cliente) {
    this.clienteService.delete(cliente.id_cliente)
      .subscribe(() => {
        this.loadAll();
        console.log("Cliente eliminado correctamente");
      });
  }

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('clientesTable'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clientes');
    XLSX.writeFile(wb, 'clientes.xlsx');
  }

  exportToPDF() {
    const data = document.getElementById('clientesTable');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();
        doc.addImage(imgData, 'PNG', 10, 10, 180, 160);
        doc.save('clientes.pdf');
      });
    }
  }

  filterClientes() {
    this.filteredClientes = this.clientes.filter(cliente =>
      Object.values(cliente).some(value => value.toString().toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
    this.totalPages = Math.ceil(this.filteredClientes.length / this.itemsPerPage);
  }

  sortClientes(column: keyof Cliente) {
    this.sortDirection = (this.sortColumn === column) ? !this.sortDirection : true;
    this.sortColumn = column;
    this.filteredClientes = this.filteredClientes.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (valueA < valueB) return this.sortDirection ? -1 : 1;
      if (valueA > valueB) return this.sortDirection ? 1 : -1;
      return 0;
    });
  }
  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.filterClientes();
  }

}
