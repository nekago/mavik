import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  FilterFieldsGroup,
  FilterFieldsGroupValue,
  OnToggleFilterInterface
} from '../../../../global/entities/filter.inerface';

@Component({
  selector: 'app-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.scss']
})
export class FilterCategoryComponent implements OnInit {
  @Input() filterGroup!: FilterFieldsGroup;
  @Output() onToggleFilterValue = new EventEmitter<OnToggleFilterInterface>()

  private readonly defaultValueToShow: number = 3

  public filterFieldCountToShow: number = this.defaultValueToShow;
  public isCollapsing: boolean = true;
  public availableToShowAllFilterItems: boolean = false;

  public get remainingToShow(): number {
    return this.filterItemsCount - this.defaultValueToShow;
  }

  private get filterItemsCount(): number {
    return this.filterGroup.values?.length;
  }

  constructor() {
  }

  ngOnInit(): void {
    if (this.remainingToShow < 1) {
      this.availableToShowAllFilterItems = true;
    }
  }

  public toggleFilterValue(key: string, filterField: FilterFieldsGroupValue, $event: any = true) {
    this.onToggleFilterValue.emit({
      key,
      filterField,
      $event,
    })
  }

  public filterFieldIsDisable(filterField: FilterFieldsGroupValue): boolean {
    return !filterField.isChecked && !filterField.isActive;
  }

  public toggleCategoryCollapsing() {
    this.filterFieldCountToShow = this.isCollapsing
      ? this.filterItemsCount
      : this.defaultValueToShow;

    this.isCollapsing = !this.isCollapsing
  }
}
