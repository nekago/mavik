import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {MainPageComponent} from "./modules/main-page/components/main-page.components";
import {ProductListComponent} from "./modules/product-list/components/product-list/product-list.component";
import {PageNotFoundComponent} from "./global/modules/page-not-found/component/page-not-found.component";
import {ProductComponent} from "./modules/product/components/product.component";

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
		path: 'categories/:slug',
		children: [
			{
				path: '',
				component: ProductListComponent,
			},
			{
				path: ':id',
				component: ProductComponent,
			},
		],
	},
	{
		path: 'cart',
    // TODO: create components for this route
		component: AppComponent,
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
