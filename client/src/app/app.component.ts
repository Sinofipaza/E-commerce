import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './ui/footer/footer.component';
import { NavComponent } from './ui/nav/nav.component';
import {  ReactiveFormsModule} from '@angular/forms';
import { CartComponent } from './ui/cart/cart.component';
import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/register/register.component';
import { ProductsPageComponent } from './ui/products-page/products-page.component';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';
import { LandingPageComponent } from './ui/landing-page/landing-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './ui/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    NavComponent,
    RouterLink,
    ReactiveFormsModule,
    ReactiveFormsModule,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    ProductsPageComponent,
    ProductsPageComponent,
    ProductDetailsComponent,
    FooterComponent,
    NavComponent,
    RouterLink,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    
  ],
  imports: [RouterOutlet, LandingPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'E-commerce';
}
