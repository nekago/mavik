import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInCartButtonComponent } from './product-in-cart-button.component';



@NgModule({
    declarations: [
        ProductInCartButtonComponent
    ],
    exports: [
        ProductInCartButtonComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ProductInCartButtonModule { }
