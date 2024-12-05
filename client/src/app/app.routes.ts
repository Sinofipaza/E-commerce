import { Routes } from '@angular/router';
import { CartComponent } from './ui/cart/cart.component';
import { OrdersComponent } from './ui/orders/orders.component';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';
import { HelpComponent } from './ui/help/help.component';
import { AboutComponent } from './ui/about/about.component';

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
    },
    { path: 'help', component: HelpComponent },
  { path: 'about', component: AboutComponent },
];

