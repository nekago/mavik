import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartList } from '../../global/entities/cart.interface';

@Injectable({
	providedIn: 'root',
})


export class HeaderService {
	private burgerIsClose: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(true);
	public burgerIsClose$: Observable<boolean> =
		this.burgerIsClose.asObservable();

	constructor() {}

	public toggleBurger(state:boolean) {
    this.burgerIsClose.next(state)
  }
}
