import {NgModule} from "@angular/core";
import {HeaderComponent} from "./components/header/header.component";
import {SearchComponent} from "./components/search/search.component";
import {SubHeaderComponent} from "./components/sub-header/sub-header.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from '@angular/forms';
import {MenuModule} from "../../global/modules/menu/menu.module";

@NgModule({
	exports: [HeaderComponent],
	declarations: [
		HeaderComponent,
		SearchComponent,
		SubHeaderComponent,
	],
	imports: [RouterModule, CommonModule, FormsModule, MenuModule],
})
export class HeaderModule {}
