import { NgModule } from '@angular/core';
import { MainPageComponent } from './components/main-page.components';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
	declarations: [MainPageComponent],
	imports: [CarouselModule, CommonModule, RouterModule],
})
export class MainPageModule {}
