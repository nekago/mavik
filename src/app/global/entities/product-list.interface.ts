import {Filters, Product} from './product.interface';

export interface ProductListInterface {
  count: number,
  pages: number,
  filters: Filters,
  next: string | null,
  prev: string | null,
  results: Product[]
}
