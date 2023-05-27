import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
	FilterFieldsGroupValue,
	FilterState,
	SelectedFilters,
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
	private selectedFilters: BehaviorSubject<SelectedFilters> =
		new BehaviorSubject<SelectedFilters>({});
	private priceSlider: BehaviorSubject<Options> = new BehaviorSubject<Options>(
		{}
	);

	public filterState$: Observable<FilterState> =
		this.filterState.asObservable();
	public selectedFilters$: Observable<SelectedFilters> =
		this.selectedFilters.asObservable();
	public priceSlider$: Observable<Options> = this.priceSlider.asObservable();

	public filterStateCategory: CategorySlugNames | undefined;

	constructor(private localizerService: LocalizerService) {}

	public initFilterState(filters: Filters, slug: CategorySlugNames) {
		this.filterStateCategory = slug;
		const filterState: FilterState = [];
		const filterFields: Array<[string, any]> = Object.entries(filters);

		const initFieldValue = (value: string): FilterFieldsGroupValue => {
			return {
				value,
				isActive: true,
			};
		};

		const initFieldGroup = (
			values: Array<string>
		): Array<FilterFieldsGroupValue> => {
			return values.reduce((acc: Array<FilterFieldsGroupValue>, elem) => {
				acc.push(initFieldValue(elem));
				return acc;
			}, []);
		};

		for (let i = 0; i < filterFields.length; i++) {
			if (filterFields[i][0] === 'price') {
				this.priceSlider.next({
					floor: filterFields[i][1].min,
					ceil: filterFields[i][1].max,
				});
			} else if (filterFields[i][0] === 'in_stock') {
				const values: Array<FilterFieldsGroupValue> = [];
				if (filterFields[i][1].length === 1) {
					values.push(
						filterFields[i][1][0]
							? initFieldValue('В наявності')
							: initFieldValue('Немає в наявності')
					);
				} else {
					values.push(initFieldValue('В наявності'));
					values.push(initFieldValue('Немає в наявності'));
				}

				filterState.push({
					key: this.localizerService.getUkrFieldGroupName(filterFields[i][0]),
          key_en: filterFields[i][0],
					values,
				});
			} else {
				filterState.push({
					key: this.localizerService.getUkrFieldGroupName(filterFields[i][0]),
          key_en: filterFields[i][0],
					values: initFieldGroup(filterFields[i][1]),
				});
			}
		}

		this.setFilterState(filterState);
	}

	public setFilterState(filterState: FilterState) {
		this.filterState.next(filterState);
	}

	public toggleSelectedFilterFieldValue(
		key: string,
		value: string,
		isAdd: boolean
	) {
		const selectedFilters = this.selectedFilters.getValue();

    if(key === 'in_stock') {
      value = Number(value === 'В наявності').toString()
    }

		if (isAdd) {
			this.addSelectedFilterFieldValue(key, value, selectedFilters);
		} else {
			this.removeSelectedFilterFieldValue(key, value, selectedFilters);
		}

		this.selectedFilters.next(selectedFilters);

	}

	public addSelectedFilterFieldValue(
		key: string,
		value: string,
		selectedFilters: SelectedFilters
	) {
		if (!Object.keys(selectedFilters)?.length) {
			selectedFilters[key] = [value];
			return;
		}

		if (selectedFilters.hasOwnProperty(key)) {
			selectedFilters[key].push(value);
		} else {
			selectedFilters[key] = [value];
		}
	}

	public removeSelectedFilterFieldValue(
		key: string,
		value: string,
		selectedFilters: SelectedFilters
	) {
		if (selectedFilters.hasOwnProperty(key)) {
			const field = selectedFilters[key];
			if (field.length === 1 && field[0] === value) {
				delete selectedFilters[key];
			} else {
				const index = field.findIndex(elem => elem === value);

				field.splice(index, 1);
			}
		}
	}

	public reset() {
		this.filterState.next([]);
		this.filterStateCategory = undefined;
	}
}
