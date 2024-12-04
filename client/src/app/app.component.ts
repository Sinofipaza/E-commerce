import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsPageComponent } from './ui/products-page/products-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'E-commerce';
}
