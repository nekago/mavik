import {Component} from "@angular/core";
import {FilterService} from '../../../product-list/services/filter.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})

export class SearchComponent {
  searchValue!: string;

  private searchTimeOut!: NodeJS.Timeout;

  constructor(
    private filterService: FilterService,
  ) {
  }

  public search($event: any) {
    if (this.searchTimeOut) {
      clearTimeout(this.searchTimeOut);
    }

    this.searchTimeOut = setTimeout(() => {
      // this.filterService.setQueryParams()
    }, 400);
  }
}
