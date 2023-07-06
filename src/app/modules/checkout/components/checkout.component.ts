import {Component, OnInit} from '@angular/core';
import {CartService} from '../../cart/service/cart.service';
import {CartList} from '../../../global/entities/cart.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.scss']
})

export class CheckoutComponent implements OnInit {

  public cartList: CartList = [];

  public totalPrice = 0;

  public form: FormGroup = new FormGroup<any>(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(1)]),
      city: new FormControl('', [Validators.required, Validators.minLength(1)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.pattern("[0-9]{10}")),
      telegram: new FormControl(''),
      comment: new FormControl(''),
    }
  )

  constructor(
    private cartService: CartService,
  ) {
    this.cartList = this.cartService.getCartList();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(data => {
      console.log(data);
      console.log(this.form);
    })
  }

  public showErrorForFormControl(field: string): boolean {
    return this.form.controls?.[field]?.touched && !this.form.controls?.[field]?.valid
  }

  public minLengthError(field: string) {
    if (this.form.controls?.[field]?.errors?.['required']) {
      return false
    }
    return !this.form.controls?.[field]?.errors?.['minLength']
  }
}
