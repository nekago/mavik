import {Component, OnDestroy, OnInit} from "@angular/core";
import {OwlOptions} from "ngx-owl-carousel-o";
import {Subject} from "rxjs";
import {Categories} from "../../../global/entities/product.interface";
import {ActivatedRoute} from "@angular/router";
import {MainPageService} from "../services/main-page.service";
import {FilterService} from "../../product-list/services/filter.service";

@Component({
  selector: 'app-main-page',
  templateUrl: 'main-page.component.html',
  styleUrls: ['main-page.component.scss']
})

export class MainPageComponent  implements OnInit, OnDestroy{

  private ngDestroy$ = new Subject<void>();
  public categories!: Categories;

  constructor(
    private mainPageService: MainPageService,
    private route: ActivatedRoute,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.mainPageService.getCategories().subscribe(data => {
      this.categories = data;
    })
  this.filterService.reset()
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }




  slides: Array<{
    src: string,
    text: string,
    name: string,
    isSelect: boolean
  }> = [
    {
      src: "assets/icons/review_icon.png",
      text: "Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu. Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu.",
      name: "Dmitriy Ivanov",
      isSelect: true
    },
    {
      src: "assets/icons/review_icon.png",
      text: "Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu. Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu.",
      name: "Dmitriy Ivanov",
      isSelect: false
    },
    {
      src: "assets/icons/review_icon.png",
      text: "Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu. Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu.",
      name: "Dmitriy Ivanov",
      isSelect: false
    },
  ]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    items: 1,
    nav: false
  }

}
