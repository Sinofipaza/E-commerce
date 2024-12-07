import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(public loginService: LoginService) {}
  menuList: string[] = ['Soccer', 'Rugby', 'Basketball', 'Cricket', 'Netball'];

  logo: string = 'icons/md-logo.png';
  icons: string[] = [
    'icons/heart-outline.svg',
    'icons/cart-outline.svg',
    'icons/account-circle.svg',
  ];

  alertFunct() {
    alert('Please login first before you view cart/orders');
  }
}
