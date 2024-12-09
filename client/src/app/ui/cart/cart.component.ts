import { ShippingService } from './../../services/shipping.service';
import { Component, inject, OnInit } from '@angular/core';
import { OrdersComponent } from "../orders/orders.component";
import { CartItems } from '../../types/cartInterface.interface';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { TaxService } from '../../services/tax.service';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ProductsService } from '../../services/products.service';
import { ProductsInterface } from '../../types/products.interface';
import { JwtHeaderService } from '../../services/jwt-interceptor.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [OrdersComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  products: ProductsInterface[] = [];
  cartForm: FormGroup;
  shippingForm: FormGroup;
  payBtn: boolean = false;
  errorMsg: string = '';

  private formBuilder = inject(FormBuilder);
  constructor(
    public cartService: CartService,
    private fb: FormBuilder,
    private taxService: TaxService,
    public loginService: LoginService,
    public productService: ProductsService,
    public jwtHeaderService: JwtHeaderService,
    public shippingService:ShippingService
  ) {
    this.jwtHeaderService.token = localStorage.getItem('token');
    this.cartForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      creditCard: ['', [Validators.required, Validators.maxLength(16)]],
      date: ['', [Validators.required, Validators.minLength(3)]],
      cvv: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.shippingForm = this.fb.group({
      street: ['', [Validators.required, Validators.minLength(2)]],
      suburb: ['', [Validators.required, Validators.maxLength(16)]],
      postalCode: ['', [Validators.required, Validators.minLength(4)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  /**
   * Initializes the component by fetching the cart items and handling any necessary actions.
   *
   * This function performs the following tasks:
   * 1. Fetches the products from the server using the `productService.getProducts()` method.
   * 2. Subscribes to the observable returned by the `getProducts()` method.
   * 3. Pushes each product into the `products` array and assigns it to the component's `products` property.
   * 4. If an error occurs during the fetching process, logs the error to the console.
   * 5. Checks if the `throughCart` property of the `cartService` is true.
   * 6. If `throughCart` is true, calls the `reloadFunc()` method and sets `throughCart` to false.
   * 7. Finally, calls the `getCartItems()` method to fetch the cart items from the server.
   */
  ngOnInit(): void {
    // this.productService.getProducts().subscribe({
    //   next: (products) => {
    //     products.forEach((product) => {
    //       this.productService.products().push(product);
    //     });
    //     this.products = products;
    //   },
    //   error: (err) => {
    //     console.error('Error fetching products:', err);
    //   },
    // });

    // if (this.cartService.throughCart) {
    //   this.reloadFunc();
    //   this.cartService.throughCart = false;
    // }

    this.getCartItems();
  }

  shippingCharges: number = 20;


  /**
   * Calculates the total price for a single item in the cart.
   *
   * @param item - The item for which the total price needs to be calculated.
   * The `item` parameter is an object of type `CartItems` that contains the properties:
   * - `id` (number): The unique identifier of the item.
   * - `name` (string): The name of the item.
   * - `price` (number): The price of the item.
   * - `quantity` (number): The quantity of the item in the cart.
   *
   * @returns The total price for the item, rounded to two decimal places.
   *
   * @example
   * const item: CartItems = { id: 1, name: 'Product A', price: 10.5, quantity: 2 };
   * const totalPrice = getTotalPerItemCount(item);
   * console.log(totalPrice); // Output: 21.00
   */
  getTotalPerItemCount(item: CartItems) {
    return Math.round(item.price * item.quantity * 100) / 100;
  }

  /**
   * Calculates the total price of all items in the cart.
   *
   * @returns The total price of all items in the cart, rounded to two decimal places.
   *
   * @remarks
   * If the cart is empty, the function returns 0.
   *
   * @example
   * const totalPrice = getTotalPrice();
   * console.log(totalPrice); // Output: 123.45
   */
  getTotalPrice(): number {
    if (this.cartService.CartItemsArray().length > 0) {
      return (
        Math.round(
          this.cartService
            .CartItemsArray()
            .reduce(
              (total, item) => total + this.getTotalPerItemCount(item),
              0,
            ) * 100,
        ) / 100
      );
    }
    return 0;
  }

  getTaxPrice() {
    return Math.round(this.taxService.taxAmount(this.getTotalPrice()*100, 15))/100;
  }


  getTotalWithShippingAndTax() {
    return (
      Math.round(
        (this.getTotalPrice() +
          this.getShippingCharges() +
          this.getTaxPrice()) *
          100,
      ) / 100
    );
  }

  removeFromCart() {
    this.cartService.CartItemsArray().filter((item) => item.quantity > 0);
  }
  // decreaseQuantity(item: CartItems) {

  //   item.quantity--;

  //   if (item.quantity === 0) {
  //     item.softdelete = true;
  //     this.removeFromCart();
  //     this.reloadFunc();
  //   }
  //   this.cartService.updateProduct(item).subscribe((data) => {
  //     // console.log(data);
  //   });
  // }
  // increaseQuantity(item: CartItems) {
  //   item.quantity++;
  //   this.cartService.updateProduct(item).subscribe((data) => {
  //     // console.log(data);
  //   });
  // }

  decreaseQuantity(item: CartItems) {
    // const myProduct: ProductsInterface | undefined = this.productService
    //   .products()
    //   .find((product) => product.name === item.name);
    // if (myProduct) {
    //   myProduct.on_hand++;
    //   this.productService
    //     .updateProductOnHnd(myProduct.id, myProduct)
    //     .subscribe((data) => {
    //     });
    // }

    item.quantity--;

    if (item.quantity === 0) {
      item.softdelete = true;
      this.removeFromCart();
      this.reloadFunc();
    }
    this.cartService.updateProduct(item).subscribe((data) => {});
  }
  increaseQuantity(item: CartItems) {
    const myProduct: ProductsInterface | undefined = this.productService
      .products()
      .find((product) => product.name === item.name);

      if (myProduct) {
        if (myProduct.on_hand - item.quantity > 0) {
          item.quantity++;
          this.cartService.updateProduct(item).subscribe((data) => {
            console.log(data);
          });
          } else {
            alert('Products selected exceeds available stock');
            return;

      }

    // if (myProduct && myProduct.on_hand - 1 > 1) {
    //   myProduct.on_hand--;
    //   this.productService
    //     .updateProductOnHnd(myProduct.id, myProduct)
    //     .subscribe((data) => {
    //     });
    // } else {
    //   alert('Products selected exceeds available stock');
    //   return;
    // }
    item.quantity++;
    this.cartService.updateProduct(item).subscribe((data) => {});
  }
}

  getCartQuantity() {
    return this.cartService
      .CartItemsArray()
      .reduce((total, item) => total + item.quantity, 0);
  }

  specificItemLookup(item: CartItems) {
    return this.cartService
      .CartItemsArray()
      .find((product) => product.id === item.id);
  }

  reloadFunc() {
    location.reload();
  }

  orderFunct() {
    if (this.cartService.CartItemsArray().length > 0) {
      this.cartService.CartItemsArray().forEach((item) => {
        item.ordered = true;
        this.cartService.updateProduct(item).subscribe((data) => {
          this.reloadFunc();
        });
      });
      alert('Your order has been placed successfully');
    } else {
      alert('Your cart is empty, please add some items to proceed.');
    }
  }

  getShippingCharges() {
    if (this.cartService.CartItemsArray.length > 0) {
      return this.shippingCharges;
    }
    return 0;
  }

  onSubmit() {
    console.warn(this.cartForm.value);
  }

  validateName(name: string): boolean {
    let validRegEx = /^[A-Za-z]+$/;
    return validRegEx.test(name.trim());
  }

  validateCreditCard(creditNumber: string): boolean {
    let validRegex = /^\d+$/;
    if (
      creditNumber.trim().length === 16 ||
      creditNumber.trim().length === 13 ||
      validRegex.test(creditNumber.trim())
    ) {
      return true;
    }
    return false;
  }

  validateDate(date: string): boolean {
    let re = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    return re.test(date);
  }

  validateCVV(cvv: string): boolean {
    let regex = /^[0-9]{3}$/;
    return regex.test(cvv.trim());
  }

  payClicked(): boolean {
    this.payBtn = true;
    return this.payBtn;
  }

  onSubmitTwo(): void {
    this.cartService.CartItemsArray().forEach((item) => {
      this.shippingService.addShippingAddress(
        this.shippingForm.value.street,
        this.shippingForm.value.suburb,
        this.shippingForm.value.postalCode,
        this.shippingForm.value.phoneNumber,
        this.shippingForm.value.email,
        item
      );
    });
    console.log(this.shippingForm.value);

  }

  getCartItems() {
    this.cartService
      .getAllProducts()
      .pipe(
        catchError((error) => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`;
          } else {
            this.errorMsg = this.getServerErrorMessage(error);
          }
          // return of([]);
          return throwError(() => this.errorMsg);
        }),
      )
      .subscribe((res: CartItems[]) => {
        let alreadyInProductArray: boolean = false;

        res.forEach((item: CartItems) => {
          for (let i = 0; i < this.cartService.CartItemsArray().length; i++) {
            if (item.id === this.cartService.CartItemsArray()[i].id) {
              alreadyInProductArray = true;
              break;
            }
          }
          if (!alreadyInProductArray) {
            this.cartService.CartItemsArray().push(item);

            alreadyInProductArray = false;
          }
        });
      });
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied not logged in`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }


}


