import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {BreadcrumbsService} from "./modules/breadcrumbs/service/breadcrumbs.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'mavik-freelance';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private breadcrumbsService: BreadcrumbsService) { }

	ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbsService.generateBreadcrumbs(this.activatedRoute.root);
      }
    });
  }
}
