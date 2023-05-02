import { NgModule } from '@angular/core';
import { MainPageComponent } from './components/main-page.components';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {CommonModule} from "@angular/common";

@NgModule({
	declarations: [MainPageComponent],
	imports: [CarouselModule, CommonModule],
})
export class MainPageModule {}
