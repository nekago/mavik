import {Product} from "./product.interface";

export interface ProductListInterface {
  count: number,
  pages?: number,
  next: string | null,
  prev: string | null,
  results: Product[]
}
