import { Routes } from '@angular/router';
import { CartComponent } from './ui/cart/cart.component';
import { OrdersComponent } from './ui/orders/orders.component';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';

export const routes: Routes = [
    {path:"orders",component:OrdersComponent},
    {
        path: "cart", component: CartComponent,
        children: [
            {path:"orders",component:OrdersComponent}
        ]
    },

    {
        path: "productsDetails", component: ProductDetailsComponent,
        children: [
            {path:"cart",component:CartComponent}
        ]
    }
];