import { Component } from '@angular/core';
import {  ReactiveFormsModule} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CartComponent } from './ui/cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'E-commerce';
}
