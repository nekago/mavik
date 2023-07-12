import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductListService} from '../../services/product-list.service';
import {
  CategoryNames, CategorySlugNames, FilterFields,
  Product,
} from '../../../../global/entities/product.interface';
import {FilterFieldsGroupValue, FilterState, FilterTag} from '../../../../global/entities/filter.inerface';
import {Observable, Subscription} from 'rxjs';
import {FilterService} from '../../services/filter.service';
import {ChangeContext, Options} from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  public categoryName: CategoryNames = 'Сир';
  public slugName: CategorySlugNames = 'cheese';
  public productList: Array<Product> = [];
  public isLoadingProductList$: Observable<boolean> = new Observable<boolean>()

  public pages: Array<number> = [];
  public pagesCount: number = 1;
  public currentPage: number = 1;

  public params: any = {};

  public filterState$: Observable<FilterState> = new Observable<FilterState>();
  public filterTags$: Observable<FilterTag> = new Observable<FilterTag>();

  public cheese20 = 15;

  public minPriceValue: number = 40;
  public maxPriceValue: number = 60;

  public options: Options = {
    floor: 0,
    ceil: 100,
  };

  private price = {
    min: 0,
    max: 0,
  }

  private isSliderInit = false

  private priceRangeTimeOut!: NodeJS.Timeout;

  private subscriptions: Subscription = new Subscription();

  private get priceRange() {
    return {
      price_min: [String(this.price.min)],
      price_max: [String(this.price.max)],
    }
  }

  constructor(
    private route: ActivatedRoute,
    private productListService: ProductListService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private filterService: FilterService,
  ) {
  }

  ngOnInit() {
    this.subscriptions.add(this.route.params.subscribe(params => {
      const slug = params['categorySlug'];
      this.slugName = slug;
      this.productListService.setCurrentCategoryBySlug(slug);
    }));

    this.subscriptions.add(this.route.queryParams.subscribe(() => {
      this.productListService.getProductListBySlug(this.slugName)
    }))

    this.subscriptions.add(this.productListService.productList$.subscribe(res => {
      this.productList = res.results;
      this.pagesCount = Math.ceil(res.count / ProductListService.defaultPageSize);
      this.pages = this.generatePages(this.pagesCount);
      this.cheese20 = res.count;
      this.cdr.detectChanges();
    }));

    this.subscriptions.add(this.productListService.category$.subscribe(data => {
      this.categoryName = data.name;
      this.slugName = data.slug;
    }));

    this.subscriptions.add(this.filterService.priceSlider$.subscribe(options => {
      let {min, max} = this.filterService.priceRange

      if ((!this.isSliderInit && options?.floor && options?.floor) || (min === -1 && max === -1)) {
        this.options = {
          ...this.options,
          ...options,
        };

        if (min === -1 && max === -1) {
          min = options.floor || 0;
          max = options.ceil || 0;
        }

        this.isSliderInit = true;

        this.minPriceValue = min || options.floor || 0;
        this.maxPriceValue = max || options.ceil || 0;
        this.price.min = this.minPriceValue;
        this.price.max = this.maxPriceValue;
      }
    }));

    this.subscriptions.add(this.filterService.selectedFilters$.subscribe(() => {
    }));

    this.subscriptions.add(this.filterService.currentPage$.subscribe(currentPage => {
      if (currentPage) {
        this.currentPage = currentPage;
      }
    }))

    this.filterState$ = this.filterService.filterState$;
    this.filterTags$ = this.filterService.filterTags$;
    this.isLoadingProductList$ = this.productListService.isLoadingProductList$;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.productListService.reset();
  }


  // FILTER

  public toggleFilterValue(key: string, filterField: FilterFieldsGroupValue, $event: any = true) {
    delete this.filterService.params?.['price_min'];
    delete this.filterService.params?.['price_max'];

    const isChecked = $event.target.checked;
    this.filterService.selectedFilterGroup = key as FilterFields;
    this.filterService.toggleSelectedFilterFieldValue(key, filterField.value, isChecked);
    this.filterService.toggleFilterTag(key, filterField.value, isChecked);

    this.isSliderInit = false;
    filterField.isChecked = isChecked;
  }

  public deleteFilterTag(elem: [string, string]) {
    this.filterService.removeFilterTag(elem[1], elem[0])
  }

  public filterFieldIsDisable(filterField: FilterFieldsGroupValue): boolean {
    return !filterField.isChecked && !filterField.isActive;
  }

  public resetFilter() {
    this.filterService.resetFilter();
  }


  // PAGINATION

  public changePage(action: 'first' | 'last' | number) {
    if (typeof action === 'number') {
      this.currentPage = action;
    } else {
      switch (action) {
        case 'first':
          this.currentPage = 1;
          break;

        case 'last':
          this.currentPage = this.pagesCount;
          break;
      }
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    this.filterService.setQueryParams({page: [this.currentPage]});
  }

  public paginationState(): 'start' | 'middle' | 'end' | 'all' {
    if (this.pages.length <= 5) {
      return 'all'
    }
    if (this.currentPage < 4) {
      return 'start'
    } else if (this.currentPage >= 4 && this.currentPage <= this.pagesCount - 3) {
      return 'middle'
    }
    return 'end'
  }

  private generatePages(pagesNumber: number): number[] {
    const pages = []
    for (let i = 0; i < pagesNumber; i++) {
      pages.push(i + 1);
    }
    return pages
  }


  // PRICE RANGE

  public setPriceRange($event: ChangeContext, priceType: 'min' | 'max') {
    console.log($event)
    if (priceType === 'min') {
      this.price.min = $event.value;
    } else {
      this.price.max = $event?.highValue ? $event.highValue : 0;
    }

    if (this.isSliderInit) {
      if (this.priceRangeTimeOut) {
        clearTimeout(this.priceRangeTimeOut);
      }

      this.priceRangeTimeOut = setTimeout(() => {
        this.filterService.setQueryParams(this.priceRange);
      }, 400)
    }
  }
}
