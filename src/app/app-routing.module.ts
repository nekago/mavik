import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {MainPageComponent} from "./modules/main-page/components/main-page.components";
import {ProductListComponent} from "./modules/product-list/components/product-list/product-list.component";

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
		path: 'category/:name',
		children: [
			{
				path: '',
				component: ProductListComponent,
			},
			{
				path: ':id',
        // TODO: create components for this route
				component: AppComponent,
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
  // TODO: create components for this route
	{ path: '**', component: AppComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
