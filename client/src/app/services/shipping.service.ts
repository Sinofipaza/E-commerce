import { CartService } from './cart.service';
import { LoginService } from './login.service';
import { JwtHeaderService } from './jwt-interceptor.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CartItems } from '../types/cartInterface.interface';

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  apiUrl: string = environment.SERVER;
  constructor(
    private http: HttpClient,
    private jwtHeaderService: JwtHeaderService,
    private loginService: LoginService,
    private cartService: CartService,
  ) {}

  addShippingAddress(
    street: string,
    suburb: string,
    postalCode: string,
    phoneNumber: string,
    email: string,
    orderedItem:CartItems
  ) {
    const stringAddress = street + " " + suburb + " " + postalCode+ " " + phoneNumber+ " " + email
    orderedItem.address = stringAddress;

    this.cartService.updateProduct(orderedItem).subscribe(
      {
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.error('Error adding shipping address:', err);
        },
      }
    );

  }
}
