import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
	FilterFieldsGroup,
	FilterState,
} from '../../../global/entities/filter.inerface';
import {
	FeatureTypes,
	FilterPrice,
	Filters,
} from '../../../global/entities/product.interface';

@Injectable({
	providedIn: 'root',
})
export class FilterService {
	private filterState: BehaviorSubject<FilterState> =
		new BehaviorSubject<FilterState>([]);
	private selectedFilters: BehaviorSubject<any> = new BehaviorSubject<any>({});

	public filterState$: Observable<FilterState> =
		this.filterState.asObservable();
	public selectedFilters$: Observable<any> =
		this.selectedFilters.asObservable();

	public initFilterState(filters: Filters) {
		const filterState: FilterState = [];
		const filterFields: Array<[string, any]> = Object.entries(filters);

		for (let i = 0; i < filterFields.length; i++) {
			if (filterFields[i][0] === 'price') {

			} else if (filterFields[i][0] === 'feature_types') {
				for (let j = 0; j < filterFields[i][1].length; j++) {
					filterState.push({
						key: filterFields[i][1][j].name,
						value: filterFields[i][1][j].features,
					});
				}
			} else {
				filterState.push({
					key: this.getUkrFieldGroupName(filterFields[i][0]),
					value: filterFields[i][1],
				});
			}
		}

		this.setFilterState(filterState);
	}

  public getUkrFieldGroupName(filterGroupName: string) {
    switch (filterGroupName) {
      case 'country':
        return "Країна"
      case 'brand':
        return "Виробник"
      case 'in_stock':
        return "Статус товару"
      default:
        return ''

    }

  }

	public setFilterState(filterState: FilterState) {
		this.filterState.next(filterState);
		console.log(filterState);
	}

	public addSelectedFilterField() {}
}
