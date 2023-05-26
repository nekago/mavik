import {Component, OnInit} from "@angular/core";
import {BreadcrumbsService} from "../service/breadcrumbs.service";

@Component({
	selector: 'app-breadcrumbs',
	templateUrl: 'breadcrumbs.component.html',
	styleUrls: ['breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
	public breadcrumbs$ = this.breadcrumbsService.breadcrumbs$;

	constructor(private breadcrumbsService: BreadcrumbsService) {}

	ngOnInit() {
    this.breadcrumbs$ = this.breadcrumbsService.breadcrumbs$;
    this.breadcrumbs$.subscribe()
  }
}
