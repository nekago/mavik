import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  FilterFieldsGroupValue,
  FilterState,
  FilterTag,
  SelectedFilters,
} from '../../../global/entities/filter.inerface';
import {
  CategorySlugNames, FilterFields,
  Filters,
} from '../../../global/entities/product.interface';
import {Options} from '@angular-slider/ngx-slider';
import {LocalizerService} from '../../../global/services/localizer.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  private priceSlider: BehaviorSubject<Options> = new BehaviorSubject<Options>(
    {}
  );

  private lastSelectedFilterGroup: FilterFields = 'brand'

  public get selectedFilterGroup(): FilterFields {
    return this.lastSelectedFilterGroup
  }

  public set selectedFilterGroup(stg: FilterFields) {
    this.lastSelectedFilterGroup = stg
  }

  public filterState$: Observable<FilterState> =
    this.filterState.asObservable();
  public filterTags$: Observable<FilterTag> =
    this.filterTags.asObservable();
  public selectedFilters$: Observable<SelectedFilters> =
    this.selectedFilters.asObservable();
  public priceSlider$: Observable<Options> = this.priceSlider.asObservable();

  public filterStateCategory: CategorySlugNames | undefined;

  public params: Record<string, string[]> = {}


  constructor(private localizerService: LocalizerService, private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe(
      query => {
        this.params = Object.entries(query).reduce((acc: Record<string, string[]>, elem) => {
          acc[elem[0]] = elem[1].split(',')
          return acc
        }, {})
        this.selectedFilters.next(this.params)

        for (const elem of Object.entries(this.params)) {
          elem[1].forEach((tag: string) => {
            this.addFilterTag(elem[0], tag)
          })
        }
      }
    )

    this.filterState.asObservable().subscribe(() => {
    })
  }

  public initFilterState(filters: Filters, slug: CategorySlugNames) {
    this.filterStateCategory = slug;
    const filterState: FilterState = [];
    const filterFields: Array<[string, any]> = Object.entries(filters);

    const fieldValueIsChecked = (value: string): boolean => {
      for (const values of Object.values(this.params)) {
        if (values.find(elem => elem === value)) {
          return true
        }
      }
      return false
    }

    const fieldValueIsActive = (value: string): boolean => {
      for (const values of Object.values(this.params)) {
        if (values.find(elem => elem === value)) {
          return true
        }
      }
      return true
    }

    const initFieldValue = (value: string): FilterFieldsGroupValue => {
      return {
        value,
        isActive: fieldValueIsActive(value),
        isChecked: fieldValueIsChecked(value)
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

  public modifyFilterState(filters: Filters) {
    const filterState = this.filterState.getValue()
    const filterKeys = Object.keys(filters) as Array<FilterFields | 'price'>
    for (let i = 0; i < filterKeys.length; i++) {
      const key = filterKeys[i];
      this.priceSlider.next({
        floor: filters['price'].min,
        ceil: filters['price'].max,
      });

      filterState.filter(filterGroup => filterGroup.key_en === key || filterGroup.key === key).forEach(elem => {
        for (const value of elem.values) {
          if (key === this.selectedFilterGroup) {
            continue;
          }

          if (key !== 'price') {
            value.isActive = filters[key].includes(value.value)
          }

        }
      })
    }
  }

  public setFilterState(filterState: FilterState) {
    this.filterState.next(filterState);
  }

  public toggleFilterTag(
    key: string,
    tag: string,
    isAdd: boolean
  ) {

    if (isAdd) {
      this.filterTags.next(this.addFilterTag(key, tag));
    } else {
      this.filterTags.next(this.removeFilterTag(tag));
    }
  }

  private addFilterTag(key: string, tag: string): FilterTag {
    const filterTag = this.filterTags.getValue();

    filterTag.push([key, tag])

    return filterTag
  }

  public removeFilterTag(tag: string, key?: string): FilterTag {
    const filterTag = this.filterTags.getValue();

    filterTag.splice(filterTag.findIndex(elem => elem[1] === tag), 1)

    if (key) {
      this.filterTags.next(filterTag)
      console.log(arguments)
      const selectedFilters = this.selectedFilters.getValue()
      this.removeSelectedFilterFieldValue(key, tag, selectedFilters)
      this.selectedFilters.next(selectedFilters);
      this.setQueryParams(selectedFilters)

      return filterTag
    } else {
      return filterTag
    }
  }

  public toggleSelectedFilterFieldValue(
    key: string,
    value: string,
    isAdd: boolean
  ) {
    const selectedFilters = this.selectedFilters.getValue();
    value = value.split(' ').join('+')

    if (key === 'in_stock') {
      value = Number(value === 'В наявності').toString()
    }

    if (isAdd) {
      this.addSelectedFilterFieldValue(key, value, selectedFilters);
    } else {
      this.removeSelectedFilterFieldValue(key, value, selectedFilters);
    }

    this.selectedFilters.next(selectedFilters);
    this.setQueryParams(selectedFilters)
  }

  private addSelectedFilterFieldValue(
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
  }

  public setQueryParams(params: any) {
    this.params = {...this.params, ...params}
    this.router.navigate([`/categories/${this.filterStateCategory}`], {
      queryParams: this.queryParamsValueToString(this.params),
    });
  }

  public queryParamsValueToString(params: Record<string, string[]>): Record<string, string> {
    return Object.entries(params).reduce((acc: Record<string, string>, elem) => {
      acc[elem[0]] = elem[1].join(',')
      return acc
    }, {})
  }

  public reset() {
    this.filterState.next([]);
    this.filterStateCategory = undefined;
  }

}
