import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MenuComponent} from "./components/menu.component";

@NgModule({
	declarations: [MenuComponent],
	imports: [CommonModule, RouterModule],
	exports: [MenuComponent],
})
export class MenuModule {}
