import { JwtHeaderService } from './../../services/jwt-interceptor.service';
import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsInterface } from '../../types/products.interface';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { CartService } from '../../services/cart.service';
import { CartItems } from '../../types/cartInterface.interface';
import { catchError, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  product: ProductsInterface | null = null;

  errorMsg: string = '';
  noError: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private loginService: LoginService,
    private cartService: CartService,
    public jwtHeaderService: JwtHeaderService,
  ) {}

  /**
   * Initializes the component by subscribing to the route parameters to fetch the product details.
   * If a valid product ID is provided, it fetches the product details from the server.
   * If the product ID is invalid or not provided, it logs an error message.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = Number(params.get('id'));

      // console.log('Product ID from route:', productId); // Log the productId

      if (!isNaN(productId)) {
        this.productsService.getProductById(productId).subscribe(
          (product) => {
            // If a single product is returned (not an array), directly assign it
            this.product = product[0];
          },
          (error) => {
            console.error('Error fetching product:', error);
          },
        );
      } else {
        console.error('Invalid product ID');
      }
    });
  }

  /**
   * Navigates the user back to the products page.
   */
  goBackToProducts() {
    this.router.navigate(['/products']);
  }

  /**
   * Adds the current product to the cart.
   * If the product details are available, it displays a success message and updates the product's quantity.
   * If the product details are not available, it displays an alert message.
   * It also handles errors during the cart save operation and displays appropriate error messages.
   */
  addToCart() {
    if (this.product) {
      alert(`Product "${this.product.name}" added to cart!`);
      let username = '';
      let softDelete = false;
      let ordered = false;
      let quantity = 1;

      this.product.on_hand--;

      const { id, name, short_description, price, thumbnail_url } =
        this.product;
      let cartItem: CartItems = {
        id,
        username,
        name: name,
        description: short_description,
        price: price,
        quantity: quantity,
        imageurl: thumbnail_url,
        softdelete: softDelete,
        ordered: ordered,
      };


      this.route.params.subscribe((params) => {
        const productId = Number(params['id']);
      });

      try {
        this.cartService
          .saveCartProduct(cartItem)
          .subscribe({
            next: (data) => {
              console.log(data);
              location.reload();
            },
            error: (err) => {
              console.error('Error adding shipping address:', err);
            },
          }
        );
      } catch (err) {
        console.log('error encountered');
      }
    } else {
      alert('Product details are not available');
    }
  }

  /**
   * Handles server error messages based on the HTTP status code.
   *
   * @param error - The HTTP error response.
   * @returns A string representing the server error message.
   */
  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }

  /**
   * Displays an alert message prompting the user to login before adding products to the cart.
   */
  alertFunct() {
    alert('Please login first before you add products to cart');
  }
}
