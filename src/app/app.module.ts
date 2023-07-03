import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from './modules/main-page/main-page.module';
import { ProductListModule } from './modules/product-list/product-list.module';
import {HeaderModule} from "./modules/header/header.module";
import {FooterModule} from "./modules/footer/footer.module";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {PageNotFoundModule} from "./global/modules/page-not-found/page-not-found.module";
import {FormsModule} from "@angular/forms";
import {ProductModule} from "./modules/product/product.module";
import {ProductCardModule} from "./modules/product-card/product-card.module";
import {CartModule} from "./modules/cart/cart.module";
import {CheckoutModule} from "./modules/checkout/checkout.module";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
		MainPageModule,
		ProductListModule,
    ProductModule,
    ProductCardModule,
		HeaderModule,
    FooterModule,
    CartModule,
    CheckoutModule,
    HttpClientModule,
    PageNotFoundModule,
    FormsModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
