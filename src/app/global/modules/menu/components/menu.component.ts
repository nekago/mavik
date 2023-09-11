import {Component} from "@angular/core";
import {HeaderService} from "../../../../modules/header/header.service";

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss']
})

export class MenuComponent {


  constructor(
    private headerService: HeaderService,
  ) {
  }


  scrollHandler(id: string) {
    const elem: HTMLElement | null = document.getElementById(id)
    if (elem) {
      (elem as HTMLElement).scrollIntoView({behavior: "smooth",block: "center", inline: "nearest"})
      this.headerService.toggleBurger(true)
    }
  }
}
