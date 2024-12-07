import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsInterface } from '../types/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  products = signal<ProductsInterface[]>([]);

  getProducts(): Observable<ProductsInterface[]> {
    return this.http.get<ProductsInterface[]>(`${this.url}/products`);
  }

  getProductById(id: number): Observable<ProductsInterface[]> {
    return this.http.get<ProductsInterface[]>(`${this.url}/products/${id}`);
  }

  updateProductOnHnd(
    productId: number,
    product: ProductsInterface | null,
  ): Observable<ProductsInterface> {
    // const emailObj = { on_hand: on_hand };
    return this.http.put<ProductsInterface>(`${this.url}/${productId}`, product);
  }
}
