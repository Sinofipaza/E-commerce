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

  constructor(private router: Router, private productService: ProductsService) { }

  /**
   * Initializes the component by fetching the list of products from the server and populating the `products` array.
   * If an error occurs during the fetching process, it logs an error message to the console.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    try {
      this.productService.getProducts().subscribe((response) => {
        this.products = response;
        this.products.forEach((product) => {
          this.productService.products().push(product);
        });
      });
    } catch (error) {
      console.log("error!!");
    }
  }

  /**
   * Navigates to the product details page using the provided product ID.
   *
   * @param id - The unique identifier of the product. If `undefined`, the function logs an error and returns early.
   * @returns {void}
   */
  showProductDetailsPage(id: number | undefined) {
    console.log('Navigating with Product ID: ', id)
    if (id === undefined) {
      console.error('ProductID is undefined!');
      return;
    }
    this.router.navigate([`products/${id}`]);
  }
}
