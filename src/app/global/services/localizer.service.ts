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


	public engCategoryToUkr(category: CategorySlugNames): CategoryNames {
		switch (category) {
			case 'cheese':
				return 'Сир';
			case 'milk':
				return 'Молочні вироби';
			case 'meat':
				return 'М`ясні вироби';
			case 'butter':
				return 'Масло';
			case 'grocery':
				return 'Бакалія';
			case 'snacks':
				return 'Снеки';
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

  public getEngFieldGroupName(filterGroupName: string) {
    switch (filterGroupName) {
      case 'Країна':
        return 'country';
      case 'Виробник':
        return 'brand';
      case 'Статус товару':
        return 'in_stock';
      default:
        return filterGroupName;
    }
  }

  public productCharacteristicsFieldToUkr(field: string): string {
    switch (field) {
      case 'brand':
        return 'Виробник';

      case 'country':
        return 'Країна';

      default:
        return field;
    }
  }

  public breadcrumbsToUkr(str: string) {
    switch (str) {
      case 'cart':
        return 'Кошик';
      case 'checkout':
        return 'Оформлення замовлення';
      default:
        return this.engCategoryToUkr(str as CategorySlugNames)
    }
  }

}


