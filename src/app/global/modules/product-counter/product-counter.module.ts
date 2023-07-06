import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCounterComponent } from './product-counter.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ProductCounterComponent
  ],
  exports: [
    ProductCounterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ProductCounterModule { }
