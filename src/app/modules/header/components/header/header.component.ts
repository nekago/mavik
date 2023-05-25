import { AfterViewInit, Component} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs";

@Component({
	selector: 'app-header',
	templateUrl: 'header.component.html',
	styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  private headerConfig = {
    pagesToHideBlocks: {
      appMenu: ['main']
    }
  }

  public isHideAppMenu = true

	constructor(private router: Router) {}

	ngAfterViewInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).pipe(
      map(() => this.router.url)
    ).subscribe(url => {
      const pages = url.split('/')
      const page = pages[pages.length - 1]
      console.log(pages)
      this.isHideAppMenu = !this.headerConfig.pagesToHideBlocks.appMenu.includes(page)
    })
  }

}
