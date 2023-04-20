import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'main',
		pathMatch: 'full',
	},
	{
		path: 'main',
		component: AppComponent,
	},
	{
		path: 'category/:name',
		children: [
			{
				path: '',
				component: AppComponent,
			},
			{
				path: ':id',
				component: AppComponent,
			},
		],
	},
	{
		path: 'cart',
		component: AppComponent,
	},
	{
		path: 'checkout',
		component: AppComponent,
	},
	{ path: '**', component: AppComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
