import { Component, OnInit } from '@angular/core';
import { ProductsInterface } from '../../types/products.interface';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  products: ProductsInterface[] = [];
  
  constructor(private router: Router, private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(response => {
        this.products = response;
      })
  }

  showProductDetailsPage(id: number) {
    this.router.navigate([`products/${id}`]);
  }
}
