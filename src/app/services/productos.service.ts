import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Producto } from "../model/productInterface";

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private http = inject(HttpClient);

  constructor(){}

    listar() {
      return this.http.get<Producto[]>("http://localhost:8080/api/products/list-products")
    }

     get(id: number) {
        return this.http.get<Producto>(`http://localhost:8080/api/products/${id}`)
      }
  create(Producto: Producto){
    return this.http.post<Producto>("http://localhost:8080/api/products", Producto);
  }

  update(id: number, Producto: Producto){
    return this.http.put<Producto>(`http://localhost:8080/api/products/${id}`, Producto);
  }

  delete(id: number) {
    return this.http.delete<void>(`http://localhost:8080/api/products/${id}`)
  }
}
