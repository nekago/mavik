import {Component, OnInit} from '@angular/core';
import {CartService} from '../../cart/service/cart.service';
import {CartItem, CartList} from '../../../global/entities/cart.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../global/services/api.services';
import {Router} from '@angular/router';
import {LocalizerService} from '../../../global/services/localizer.service';

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
      first_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      city: new FormControl('', [Validators.required, Validators.minLength(1)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_number: new FormControl('', Validators.pattern('[0-9]{10}')),
      telegram: new FormControl(''),
      comment: new FormControl(''),
    }
  )
  isFormSubmitted: boolean = false;

  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private router: Router,
    private localizerService: LocalizerService,
  ) {
    this.cartList = this.cartService.getCartList();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(data => {
      // console.log(data);
      // console.log(this.form);
    })
  }

  public submitForm() {
    const form = this.form.value;
    this.apiService.post('order/', {
      ...form,
      products: this.cartList.map(elem => ({
        product: elem.id,
        quantity: elem.count,
      }))
    }).subscribe(() => {
      this.resetForm();
      this.isFormSubmitted = true;
      this.cartService.resetCart();

      setTimeout(() => {
        this.router.navigateByUrl('/main')
      }, 2000)
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

  goToProduct(item: CartItem) {
    this.router.navigateByUrl(`categories/${this.localizerService.ukrCategoryToEng(item.category)}/${item.id}`);
  }

  private resetForm() {
    this.form.reset();
  }
}
