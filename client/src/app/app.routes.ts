import { Routes } from '@angular/router';
import { ProductsPageComponent } from './ui/products-page/products-page.component';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';

export const routes: Routes = [
    {path: "products", component: ProductsPageComponent, pathMatch: "full"},
    {path: "products/:id", component: ProductDetailsComponent, pathMatch: "full"}
];
