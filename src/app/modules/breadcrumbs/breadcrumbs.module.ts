import {NgModule} from "@angular/core";
import {BreadcrumbsComponent} from "./component/breadcrumbs.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
	declarations: [BreadcrumbsComponent],
	exports: [BreadcrumbsComponent],
	imports: [CommonModule, RouterModule],
})
export class BreadcrumbsModule {}
