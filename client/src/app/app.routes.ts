import { Routes } from '@angular/router';
import { AboutComponent } from './ui/about/about.component';
import { CartComponent } from './ui/cart/cart.component';
import { HelpComponent } from './ui/help/help.component';
import { OrdersComponent } from './ui/orders/orders.component';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';
import { ProductsPageComponent } from './ui/products-page/products-page.component';

import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/register/register.component';
import { LandingPageComponent } from './ui/landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'orders', component: OrdersComponent },
  {
    path: 'cart',
    component: CartComponent,
    children: [{ path: 'orders', component: OrdersComponent }],
  },

  {
    path: 'productsDetails',
    component: ProductDetailsComponent,
    children: [{ path: 'cart', component: CartComponent }],
  },
  { path: 'help', component: HelpComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsPageComponent, pathMatch: 'full' },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    pathMatch: 'full',
  },
  { path: 'products', component: ProductsPageComponent, pathMatch: 'full' },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    pathMatch: 'full',
  },
  { path: 'products', component: ProductsPageComponent, pathMatch: 'full' },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    pathMatch: 'full',
  },
  { path: '', component: LandingPageComponent },
];

