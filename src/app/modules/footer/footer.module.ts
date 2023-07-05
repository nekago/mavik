import {NgModule} from "@angular/core";
import {FooterComponent} from "./components/footer.component";
import {RouterModule} from "@angular/router";

@NgModule({
	exports: [FooterComponent],
	declarations: [FooterComponent],
	imports: [RouterModule],
})
export class FooterModule {}
