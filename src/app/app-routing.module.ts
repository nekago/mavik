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
    // TODO: create component for this route
		component: AppComponent,
	},
	{
		path: 'category/:name',
		children: [
			{
				path: '',
        // TODO: create component for this route
				component: AppComponent,
			},
			{
				path: ':id',
        // TODO: create component for this route
				component: AppComponent,
			},
		],
	},
	{
		path: 'cart',
    // TODO: create component for this route
		component: AppComponent,
	},
	{
		path: 'checkout',
    // TODO: create component for this route
		component: AppComponent,
	},
  // TODO: create component for this route
	{ path: '**', component: AppComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
