import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'mavik-freelance';

  constructor(private activateRoute: ActivatedRoute) {
    console.log(activateRoute.snapshot.params)
  }
}
