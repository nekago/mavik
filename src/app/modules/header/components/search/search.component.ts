import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FilterService} from '../../../product-list/services/filter.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {
  @Input() isDisabled = false

  searchValue!: string;

  private searchTimeOut!: NodeJS.Timeout;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private filterService: FilterService,
  ) {
  }

  ngOnInit() {
    this.subscriptions.add(this.filterService.searchQuery$.subscribe(data => {
      this.searchValue = data;
    }))
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public search($event: any) {
    if (this.isDisabled) return;

    if (this.searchTimeOut) {
      clearTimeout(this.searchTimeOut);
    }

    this.searchTimeOut = setTimeout(() => {
      this.filterService.setSearchQuery($event);
    }, 400);
  }
}
