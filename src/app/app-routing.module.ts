import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {MainPageComponent} from "./modules/main-page/components/main-page.components";
import {ProductListComponent} from "./modules/product-list/components/product-list/product-list.component";
import {PageNotFoundComponent} from "./global/modules/page-not-found/component/page-not-found.component";
import {ProductComponent} from "./modules/product/components/product.component";
import {CartComponent} from "./modules/cart/components/cart.component";

const routes: Routes = [
	{
		path: '',
		redirectTo: 'main',
		pathMatch: 'full',
	},
	{
		path: 'main',
		component: MainPageComponent,
	},
	{
		path: 'categories/:categorySlug',
		children: [
			{
				path: '',
				component: ProductListComponent,
			},
			{
				path: ':productId',
				component: ProductComponent,
			},
		],
	},
	{
		path: 'cart',
		component: CartComponent,
	},
	{
		path: 'checkout',
    // TODO: create components for this route
		component: AppComponent,
	},

	{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
