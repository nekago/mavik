import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
	FilterState,
} from '../../../global/entities/filter.inerface';
import {
	CategorySlugNames,
	Filters,
} from '../../../global/entities/product.interface';
import { Options } from '@angular-slider/ngx-slider';
import { LocalizerService } from '../../../global/services/localizer.service';

@Injectable({
	providedIn: 'root',
})
export class FilterService {
	private filterState: BehaviorSubject<FilterState> =
		new BehaviorSubject<FilterState>([]);
	private selectedFilters: BehaviorSubject<any> = new BehaviorSubject<any>({});
	private priceSlider: BehaviorSubject<Options> = new BehaviorSubject<Options>(
		{}
	);

	public filterState$: Observable<FilterState> =
		this.filterState.asObservable();
	public selectedFilters$: Observable<any> =
		this.selectedFilters.asObservable();
	public priceSlider$: Observable<Options> = this.priceSlider.asObservable();

	public filterStateCategory: CategorySlugNames | undefined;

	constructor(
    private localizerService: LocalizerService,
  ) {}

	public initFilterState(filters: Filters, slug: CategorySlugNames) {
		this.filterStateCategory = slug;
		const filterState: FilterState = [];
		const filterFields: Array<[string, any]> = Object.entries(filters);

		for (let i = 0; i < filterFields.length; i++) {
			if (filterFields[i][0] === 'price') {
				this.priceSlider.next({
					floor: filterFields[i][1].min,
					ceil: filterFields[i][1].max,
				});
			} else if (filterFields[i][0] === 'in_stock') {
				const value = [];
				if (filterFields[i][1].length === 1) {
					value.push(
						filterFields[i][1][0] ? 'В наявності' : 'Немає в наявності'
					);
				} else {
					value.push('В наявності');
					value.push('Немає в наявності');
				}

				filterState.push({
					key: this.localizerService.getUkrFieldGroupName(filterFields[i][0]),
					value,
				});
			} else {
				filterState.push({
					key: this.localizerService.getUkrFieldGroupName(filterFields[i][0]),
					value: filterFields[i][1],
				});
			}
		}

		this.setFilterState(filterState);
	}

	public setFilterState(filterState: FilterState) {
		this.filterState.next(filterState);
		console.log(filterState);
	}

	public addSelectedFilterField() {}

	public reset() {
		this.filterState.next([]);
		this.filterStateCategory = undefined;
	}
}
