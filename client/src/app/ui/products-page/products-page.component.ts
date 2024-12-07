import { Component, OnInit } from '@angular/core';
import { ProductsInterface } from '../../types/products.interface';
import { ProductsService } from '../../services/products.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  products: ProductsInterface[] | null = [];
  
  constructor(private router: Router, private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(response => {
        this.products = response;
        this.products.forEach((product) => {
          this.productService.products().push(product);
        });
      })
  }

  showProductDetailsPage(id: number | undefined) {
    console.log('Navigating with Product ID: ', id)
    if (id === undefined) {
      console.error('ProductID is undefined!');
      return;
    }
    this.router.navigate([`products/${id}`]);
  }
}
