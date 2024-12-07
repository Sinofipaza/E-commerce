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

  private formBuilder = inject(FormBuilder);
  constructor(
    public cartService: CartService,
    private fb: FormBuilder,
    private taxService: TaxService,
    public loginService: LoginService,
    public productService: ProductsService,
  ) {
    this.cartForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      creditCard: ['', [Validators.required, Validators.maxLength(16)]],
      date: ['', [Validators.required, Validators.minLength(3)]],
      cvv: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        products.forEach((product) => {
          this.productService.products().push(product);
        });
        this.products = products;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });

    if (this.cartService.throughCart) {
      this.reloadFunc();
      this.cartService.throughCart = false;
    }

    this.cartService.getCartItems();
  }

  shippingCharges: number = 20;

  getTotalPerItemCount(item: CartItems) {
    return Math.round(item.price * item.quantity * 100) / 100;
  }

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

  getTotalPriceInclTax(): number {
    return Math.round(this.taxService.taxAmount(this.getTotalPrice(), 15));
  }
  getTotalWithShippingAndTax() {
    return (
      Math.round(
        (this.getTotalPrice() +
          this.getShippingCharges() +
          this.getTotalPriceInclTax()) *
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
    const myProduct: ProductsInterface | undefined = this.productService
      .products()
      .find((product) => product.name === item.name);
    if (myProduct) {
      myProduct.on_hand++;
      this.productService
        .updateProductOnHnd(myProduct.id, myProduct)
        .subscribe((data) => {
        });
    }

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
    if (myProduct && myProduct.on_hand - 1 > 1) {
      myProduct.on_hand--;
      this.productService
        .updateProductOnHnd(myProduct.id, myProduct)
        .subscribe((data) => {
        });
    } else {
      alert('Products selected exceeds available stock');
      return;
    }
    item.quantity++;
    this.cartService.updateProduct(item).subscribe((data) => {
      console.log(data);
    });
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
}
