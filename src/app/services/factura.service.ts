import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Factura } from '../model/facturaInterface';


@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private http = inject(HttpClient);


  constructor() { }

  create(factura: Factura) {
    return this.http.post<Factura>("http://localhost:8080/api/facturas", factura);
  }
}
