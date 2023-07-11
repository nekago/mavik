import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
	FilterFieldsGroupValue,
	FilterState,
	FilterTag,
	PriceRange,
	SelectedFilters,
} from '../../../global/entities/filter.inerface';
import {
	CategorySlugNames,
	FilterFields,
	Filters,
} from '../../../global/entities/product.interface';
import { Options } from '@angular-slider/ngx-slider';
import { LocalizerService } from '../../../global/services/localizer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class FilterService {
	private filterTags: BehaviorSubject<FilterTag> =
		new BehaviorSubject<FilterTag>([]);
	private filterState: BehaviorSubject<FilterState> =
		new BehaviorSubject<FilterState>([]);
	private selectedFilters: BehaviorSubject<SelectedFilters> =
		new BehaviorSubject<SelectedFilters>({});
	private selectedPriceRange: BehaviorSubject<PriceRange> =
		new BehaviorSubject<PriceRange>({} as PriceRange);
	private searchQuery: BehaviorSubject<string> =
		new BehaviorSubject<string>('');
	private priceSlider: BehaviorSubject<Options> = new BehaviorSubject<Options>(
		{}
	);

	tmp: any = {};

	private lastSelectedFilterGroup: FilterFields = 'brand';

	public get selectedFilterGroup(): FilterFields {
		return this.lastSelectedFilterGroup;
	}

	public set selectedFilterGroup(stg: FilterFields) {
		this.lastSelectedFilterGroup = stg;
	}

	public filterState$: Observable<FilterState> =
		this.filterState.asObservable();
	public filterTags$: Observable<FilterTag> = this.filterTags.asObservable();
	public selectedFilters$: Observable<SelectedFilters> =
		this.selectedFilters.asObservable();
	public selectedPriceRange$: Observable<PriceRange> =
		this.selectedPriceRange.asObservable();
  public searchQuery$: Observable<string> =
    this.searchQuery.asObservable()
	public priceSlider$: Observable<Options> = this.priceSlider.asObservable();

	public filterStateCategory: CategorySlugNames | undefined;

	public params: Record<string, string[]> = {};

	get priceRange(): PriceRange {
		return this.selectedPriceRange.getValue();
	}

	constructor(
		private localizerService: LocalizerService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
    // TODO:
		activatedRoute.queryParams.subscribe(query => {
			const priceRage: PriceRange = {
				min: 0,
				max: 0,
			};

			this.params = Object.entries(query).reduce(
				(acc: Record<string, string[]>, elem) => {
					if (elem[0] === 'price_min') {
						priceRage.min = elem[1];
					}

					if (elem[0] === 'price_max') {
						priceRage.max = elem[1];
					}

					if (elem[0] === 'searchQuery') {
						this.setSearchQuery(elem[1]);
            return acc;
					}

					acc[elem[0]] = elem[1]?.split(',');
					return acc;
				},
				{}
			);
			this.setPriceRange(priceRage.min || -1, priceRage.max || -1);
			this.selectedFilters.next(this.params);
		});

		this.filterState.asObservable().subscribe(() => {
			if (!this.filterTags.getValue().length) {
				for (const elem of Object.entries(this.params)) {
					elem[1].forEach((tag: string) => {
            console.log(tag)
						if (!Number(tag) && Number(tag) !== 0) {
							this.addFilterTag(elem[0], tag);
						}
					});
				}
			}
		});
	}

  public setSearchQuery(value: string) {
    this.searchQuery.next(value)

    this.setQueryParams({search_query: [value]})
  }

  public getSearchQuery(): [string] {
    return [this.searchQuery.getValue()];
  }

  public setPriceRange(min: number, max: number){
    this.selectedPriceRange.next({
      min,
      max,
    })
  }

  public getPriceRange(): {
    price_min: [string];
    price_max: [string];
  } {
    const {min, max} = this.selectedPriceRange.getValue();
    return {
      price_min: [String(min)],
      price_max: [String(max)],
    };
  }

	public initFilterState(filters: Filters, slug: CategorySlugNames) {
		this.filterStateCategory = slug;
		const filterState: FilterState = [];
		const filterFields: Array<[string, any]> = Object.entries(filters);

		const fieldValueIsChecked = (value: string): boolean => {
			for (const values of Object.values(this.params)) {
				if (values.find(elem => elem === value)) {
					return true;
				}
			}
			return false;
		};

		const fieldValueIsActive = (value: string): boolean => {
			for (const values of Object.values(this.params)) {
				if (values.find(elem => elem === value)) {
					return true;
				}
			}
			return true;
		};

		const initFieldValue = (value: string): FilterFieldsGroupValue => {
			return {
				value,
				isActive: fieldValueIsActive(value),
				isChecked: fieldValueIsChecked(value),
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

	public modifyFilterState(filters: Filters) {
		const filterState = this.filterState.getValue();
		const filterKeys = Object.keys(filters) as Array<FilterFields | 'price'>;

		for (let i = 0; i < filterKeys.length; i++) {
			const key = filterKeys[i];

			if (key === 'price') {
				this.priceSlider.next({
					floor: filters['price'].min,
					ceil: filters['price'].max,
				});
			}

			filterState
				.filter(
					filterGroup => filterGroup.key_en === key || filterGroup.key === key
				)
				.forEach(elem => {
					for (const value of elem.values) {
						if (key === this.selectedFilterGroup) {
							continue;
						}

						if (key !== 'price') {
							value.isActive = filters[key].includes(value.value);
						}
					}
				});
		}
	}

	public setFilterState(filterState: FilterState) {
		this.filterState.next(filterState);
	}

	public toggleFilterTag(key: string, tag: string, isAdd: boolean) {
		if (isAdd) {
			this.filterTags.next(this.addFilterTag(key, tag));
		} else {
			this.filterTags.next(this.removeFilterTag(tag));
		}
	}

	private addFilterTag(key: string, tag: string): FilterTag {
		const filterTag = this.filterTags.getValue();

		filterTag.push([key, tag]);

		return filterTag;
	}

	public removeFilterTag(tag: string, key?: string): FilterTag {
		const filterTag = this.filterTags.getValue();

		filterTag.splice(
			filterTag.findIndex(elem => elem[1] === tag),
			1
		);

		if (key) {
			this.filterTags.next(filterTag);

			const selectedFilters = this.selectedFilters.getValue();
			this.removeSelectedFilterFieldValue(key, tag, selectedFilters);
			this.selectedFilters.next(selectedFilters);
			this.setQueryParams(selectedFilters);

			return filterTag;
		} else {
			return filterTag;
		}
	}

	public toggleSelectedFilterFieldValue(
		key: string,
		value: string,
		isAdd: boolean
	) {
		const selectedFilters = this.selectedFilters.getValue();
		value = value.split(' ').join(' ');

		if (key === 'in_stock') {
			value = Number(value === 'В наявності').toString();
		}
		if (isAdd) {
			FilterService.addSelectedFilterFieldValue(key, value, selectedFilters);
		} else {
			this.removeSelectedFilterFieldValue(key, value, selectedFilters);
		}

		this.selectedFilters.next(selectedFilters);
		this.setQueryParams(selectedFilters);
	}

	private static addSelectedFilterFieldValue(
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

	private removeSelectedFilterFieldValue(
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
		// @ts-ignore

		const filterState = this.filterState.getValue();
		const tmp = filterState
			.filter(state => state.key === key || state.key_en === key)?.[0]
			.values.filter(fieldValue => fieldValue.value === value)?.[0];

		if (tmp?.isChecked) {
			tmp.isChecked = false;
		}

		this.filterState.next(filterState);
	}

	public setQueryParams(params: any, isReset?: boolean) {
		this.params = isReset ? {} : { ...this.params, ...params };
		this.tmp = params;
		this.router.navigate([`/categories/${this.filterStateCategory}`], {
			queryParams: this.queryParamsValueToString(this.params),
		});
	}

	public queryParamsValueToString(
		params: Record<string, string[]>
	): Record<string, string> {
		return Object.entries(params).reduce(
			(acc: Record<string, string>, elem) => {
				if (elem[0] === 'price_min') {
					acc[elem[0]] = String(elem[1]);
					return acc;
				}

				if (elem[0] === 'price_max') {
					acc[elem[0]] = String(elem[1]);
					return acc;
				}

				acc[elem[0]] = elem[1].join(',');
				return acc;
			},
			{}
		);
	}

	public resetFilter() {
		this.selectedFilters.next({});
		this.setQueryParams({}, true);
		this.filterTags.next([]);
		for (const value of Object.values(this.filterState.getValue())) {
			for (const fieldValue of value.values) {
				fieldValue.isChecked = false;
			}
		}
    this.searchQuery.next('');
    this.selectedPriceRange.next({
      min: -1,
      max: -1,
    })
	}

	public reset() {
		this.filterState.next([]);
		this.filterTags.next([]);
		this.filterStateCategory = undefined;
	}
}
