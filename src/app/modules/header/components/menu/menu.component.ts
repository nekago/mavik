import {Component} from "@angular/core";

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss']
})

export class MenuComponent {


  scrollHandler(id: string) {
    const elem: HTMLElement | null = document.getElementById(id)
    if (elem) {
      (elem as HTMLElement).scrollIntoView({behavior: "smooth",block: "center", inline: "nearest"})
    }
  }
}
