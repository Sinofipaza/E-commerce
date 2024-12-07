import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsInterface } from '../../types/products.interface';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsInterface } from '../../types/products.interface';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { CartService } from '../../services/cart.service';
import { CartItems } from '../../types/cartInterface.interface';

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
    private productsService: ProductsService,
    private loginService: LoginService,
    private cartService: CartService,
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
      let username = this.loginService.usernameEmail.value;
      let softDelete = false;
      let ordered = false;
      let quantity = 1;

      this.product.on_hand--;

      // console.log(this.product.on_hand);

      const { id, name, short_description, price, thumbnail_url} =
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

      this.cartService.saveCartProduct(cartItem).subscribe((data) => {
        console.log(this.cartService.CartItemsArray().length);
      });
      // this.cartService.throughCart = true;
      this.router.navigate(['/cart']);
    } else {
      alert('Product details are not available');
    }
  }
}
