import {Component} from "@angular/core";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-main-page',
  templateUrl: 'main-page.component.html',
  styleUrls: ['main-page.component.scss']
})

export class MainPageComponent {



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
