import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { CartItems } from '../types/cartInterface.interface';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  CartItemsArray = signal<CartItems[]>([]);
  OrderedItems = signal<CartItems[]>([]);
  subscriptionList: Subscription[] = [];
  throughCart: boolean = false;

  apiUrl: string = 'http://localhost:3000/';
  constructor(
    private http: HttpClient,
    // public loginService: LoginService,
  ) {}

  // getAllProducts(email: string): Observable<CartItems[]> | undefined {
  //   const emailObj = { email: email };
  //   return this.http.post<CartItems[]>(this.apiUrl + 'cartItems', emailObj);
  // }

  getAllProducts(): Observable<CartItems[]> | undefined {
    // const emailObj = { email: email };
    return this.http.get<CartItems[]>(this.apiUrl + 'cartItems');
  }

  getAllOrderedProducts(email: string): Observable<CartItems[]> {
    const emailObj = { email: email };
    return this.http.post<CartItems[]>(this.apiUrl + 'ordered', emailObj);
  }

  updateProduct(product: CartItems) {
    return this.http.put<CartItems>(this.apiUrl + 'updateCartITem', product);
  }

  saveCartProduct(product: CartItems) {
    let toUpdate: boolean = false;

    this.CartItemsArray().forEach((itemArray) => {
      if (itemArray.name == product.name) {
        product.id = itemArray.id;

        product.quantity += itemArray.quantity;
        toUpdate = true;
        return;
      }
    });

    if (toUpdate) {
      console.log(product.quantity);
      return this.http.put<CartItems>(this.apiUrl + 'updateCartITem', product);
    }

    // this.loginService.usernameEmail;
    return this.http.post<CartItems>(this.apiUrl + 'saveCartItem', product);
  }

  getCartItems() {
    this.getAllProducts()?.subscribe(
      // this.getAllProducts(this.loginService.usernameEmail.value)?.subscribe(
      (res: CartItems[]) => {
        let alreadyInProductArray: boolean = false;

        res.forEach((item: CartItems) => {
          for (let i = 0; i < this.CartItemsArray().length; i++) {
            if (item.id === this.CartItemsArray()[i].id) {
              alreadyInProductArray = true;
              break;
            }
          }

          if (!alreadyInProductArray) {
            this.CartItemsArray().push(item);

            alreadyInProductArray = false;
          }
        });
      },
    );
  }
}
