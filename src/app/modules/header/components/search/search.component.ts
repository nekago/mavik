import {Component, OnInit} from '@angular/core';
import {FilterService} from '../../../product-list/services/filter.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})

export class SearchComponent implements OnInit {
  searchValue!: string;

  private searchTimeOut!: NodeJS.Timeout;

  constructor(
    private filterService: FilterService,
  ) {
  }

  ngOnInit() {
    this.filterService.searchQuery$.subscribe(data => {
      this.searchValue = data;
    })
  }

  public search($event: any) {
    if (this.searchTimeOut) {
      clearTimeout(this.searchTimeOut);
    }

    this.searchTimeOut = setTimeout(() => {
      this.filterService.setSearchQuery($event);
    }, 400);
  }
}
