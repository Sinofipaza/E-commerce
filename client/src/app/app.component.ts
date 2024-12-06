import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { ProductsPageComponent } from './ui/products-page/products-page.component';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';
=======
import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/register/register.component';
>>>>>>> login/register

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, ProductsPageComponent, ProductDetailsComponent],
=======
  imports: [RouterOutlet, LoginComponent, RegisterComponent],
>>>>>>> login/register
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'E-commerce';
}
