import {NgModule} from "@angular/core";
import {HeaderComponent} from "./components/header/header.component";
import {SearchComponent} from "./components/search/search.component";
import {SubHeaderComponent} from "./components/sub-header/sub-header.component";
import {MenuComponent} from "./components/menu/menu.component";
import {RouterModule} from "@angular/router";

@NgModule({
	exports: [HeaderComponent],
	declarations: [
		HeaderComponent,
		SearchComponent,
		SubHeaderComponent,
		MenuComponent,
	],
	imports: [RouterModule],
})
export class HeaderModule {}
