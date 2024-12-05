import { Component } from '@angular/core';
import {  ReactiveFormsModule} from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartComponent } from './ui/cart/cart.component';
import { FooterComponent } from './ui/footer/footer.component';
import { NavComponent } from './ui/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,CartComponent, FooterComponent, NavComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'E-commerce';
}
