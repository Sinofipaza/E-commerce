import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { JwtHeaderService } from '../../services/jwt-interceptor.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {

  constructor(public loginService: LoginService, public jwtHeaderService: JwtHeaderService) {
    this.jwtHeaderService.token = localStorage.getItem('token');

  }
  menuList: string[] = ['Soccer', 'Rugby', 'Basketball', 'Cricket', 'Netball'];

  logo: string = 'icons/md-logo.png';
  icons: string[] = [
    'icons/heart-outline.svg',
    'icons/cart-outline.svg',
    'icons/account-circle.svg',
  ];

  /**
   * Displays an alert message to prompt the user to login before viewing cart or orders.
   *
   * @remarks
   * This function is called when a user attempts to access the cart or orders section without being logged in.
   * It uses the JavaScript `alert` function to display a message to the user.
   *
   * @returns {void}
   * This function does not return any value.
   */
  alertFunct() {
    alert('Please login first before you view cart/orders');
  }
}
