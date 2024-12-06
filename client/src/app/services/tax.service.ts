import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  taxAmount(amount: number, taxRate: number): number{
    return (amount * taxRate) / 100;
  }
  totalAmount(amount: number, taxRate: number): number{
    const tax = this.taxAmount(amount, taxRate);
    return amount + tax;
  }
  constructor() { }

}

  // calculate() {
  //   this.taxAmount = this.taxService.taxAmount(this.purchaseAmount, this.taxRate);
  //   this.totalAmount = this.taxService.totalAmount(this.purchaseAmount, this.taxRate);
  // }