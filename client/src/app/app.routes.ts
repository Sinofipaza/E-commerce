import { Routes } from '@angular/router';
import { LandingPageComponent } from './ui/landing-page/landing-page.component';
import { ProductsPageComponent } from './ui/products-page/products-page.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'products', component: ProductsPageComponent}
];
