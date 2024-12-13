import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cliente } from './../model/clienteInterface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private http = inject(HttpClient);

  constructor() { }

  listar() {
    return this.http.get<Cliente[]>("http://localhost:8080/api/clientes/list")
  }

  get(id: number) {
    return this.http.get<Cliente>(`http://localhost:8080/api/clientes/${id}`)
  }
  create(cliente: Cliente){
    return this.http.post<Cliente>("http://localhost:8080/api/clientes", cliente);
  }

  update(id: number, cliente: Cliente){
    return this.http.put<Cliente>(`http://localhost:8080/api/clientes/${id}`, cliente);
  }

  delete(id: number) {
    return this.http.delete<void>(`http://localhost:8080/api/clientes/${id}`)
  }
}
