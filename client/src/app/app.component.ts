import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsPageComponent } from './ui/products-page/products-page.component';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsPageComponent, ProductDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'E-commerce';
}
