import { Component, OnInit } from '@angular/core';
import { CartItems } from '../../types/cartInterface.interface';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  constructor(public cartService: CartService, public loginService: LoginService) {
  }
  ngOnInit(): void {
    this.getOrderedItems();
  }


  getOrderedItems() {
      this.cartService.getAllOrderedProducts(this.loginService.usernameEmail.value).subscribe((res: CartItems[]) => {
        // this.cartService.getAllOrderedProducts().subscribe((res: CartItems[]) => {
        let alreadyInOrdered : boolean = false;
        res.forEach((item: CartItems) => {
          for (let i = 0; i < this.cartService.OrderedItems().length; i++) {
            if (item.id === this.cartService.OrderedItems()[i].id) {
              alreadyInOrdered = true;
              break;
            }
          }
          if (!alreadyInOrdered) {
            this.cartService.OrderedItems().push(item);
            alreadyInOrdered = false;
          }
        });
      })
  }


  getTotalPerItemCount(item: CartItems) {
    return Math.round(item.price * item.quantity * 100) / 100;
  }

  cancelOrderFunct() {
    this.cartService.OrderedItems().forEach((item) => {
      item.ordered = false;
      item.softdelete = true;
      location.reload();
      this.cartService.updateProduct(item).subscribe((data) => {
        console.log(data);
      });
    });
  }
}
