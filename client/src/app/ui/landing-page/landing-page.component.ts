import { Component } from '@angular/core';
import { ProductsPageComponent } from '../products-page/products-page.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing-page.component.html'
  ,
  styleUrl: './landing-page.component.css',
})


export class LandingPageComponent {

  constructor(private router: Router) { }

  showProducts() {
    this.router.navigate(['/products']);
  }
}
