import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsInterface } from '../../types/products.interface';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  product: ProductsInterface | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = Number(params.get('id'));

      console.log('Product ID from route:', productId); // Log the productId

      if (!isNaN(productId)) {
        this.productsService.getProductById(productId).subscribe(
          (product) => {
            // If a single product is returned (not an array), directly assign it
            this.product = product[0];
            console.log('Product fetched: ', this.product);
          },
          (error) => {
            console.error('Error fetching product:', error);
          }
        );
      } else {
        console.error('Invalid product ID');
      }
    });
  }

  goBackToProducts() {
    this.router.navigate(['/products']);
  }

  addToCart() {
    if (this.product) {
      alert(`Product "${this.product.name}" added to cart!`);
    } else {
      alert('Product details are not available');
    }
  }
}
