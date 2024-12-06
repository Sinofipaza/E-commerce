import { Routes } from '@angular/router';
import { ProductsPageComponent } from './ui/products-page/products-page.component';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';
import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/register/register.component';

export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent  },
    { path: 'register', component: RegisterComponent },
    {path: "products", component: ProductsPageComponent, pathMatch: "full"},
    {path: "products/:id", component: ProductDetailsComponent, pathMatch: "full"}
];
