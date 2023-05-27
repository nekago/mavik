import { Injectable } from '@angular/core';
import {
	CategoryNames,
	CategorySlugNames,
} from '../entities/product.interface';

@Injectable({
	providedIn: 'root',
})
export class LocalizerService {
	public ukrCategoryToEng(category: CategoryNames): CategorySlugNames {
		switch (category) {
			case 'Сир':
				return 'cheese';
			case 'Молочні вироби':
				return 'milk';
			case 'М`ясні вироби':
				return 'meat';
			case 'Масло':
				return 'butter';
			case 'Бакалія':
				return 'grocery';
			case 'Снеки':
				return 'snacks';
			default:
				return category;
		}
	}


	public engCategoryToUkr(category: CategoryNames): CategorySlugNames {
		switch (category) {
			case 'Сир':
				return 'cheese';
			case 'Молочні вироби':
				return 'milk';
			case 'М`ясні вироби':
				return 'meat';
			case 'Масло':
				return 'butter';
			case 'Бакалія':
				return 'grocery';
			case 'Снеки':
				return 'snacks';
			default:
				return category;
		}
	}

  public getUkrFieldGroupName(filterGroupName: string) {
    switch (filterGroupName) {
      case 'country':
        return 'Країна';
      case 'brand':
        return 'Виробник';
      case 'in_stock':
        return 'Статус товару';
      default:
        return filterGroupName;
    }
  }

}


