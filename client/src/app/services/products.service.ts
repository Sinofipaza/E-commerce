import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../types/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url = 'http://localhost:3000/'

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductsInterface> {
    return this.http.get<ProductsInterface>(`${this.url}/products`);
  }

  getProductById(id: number): Observable<ProductsInterface> {
    return this.http.get<ProductsInterface>(`${this.url}/products/${id}`);
  }
}
