import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {MainPageComponent} from "./modules/main-page/components/main-page.components";

const routes: Routes = [
	{
		path: '',
		redirectTo: 'main',
		pathMatch: 'full',
	},
	{
		path: 'main',
    // TODO: create components for this route
		component: MainPageComponent,
	},
	{
		path: 'category/:name',
		children: [
			{
				path: '',
        // TODO: create components for this route
				component: AppComponent,
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
