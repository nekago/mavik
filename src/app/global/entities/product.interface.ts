
export interface Categories {
  id: number,
  name: CategoryNames,
  feature_types: FeatureTypes,
  img: string
}

export type FeatureTypes = Array<FeatureType>

export interface FeatureType {
  id: number,
  name: string,
  features: Array<string>
}


export interface Product {
  id: number,
  features: ProductFeatures,
  brand: string,
  country: string,
  category: string,
  name: string,
  price: string,
  img: string,
  type_product: string,
  description: string,
  in_stock: 1 | 0,
}

export type ProductFeatures = Array<ProductFeature>

export interface ProductFeature {
  id: number,
  type: FeatureTypeNames
  value: string
}

export type FeatureTypeNames =
  CheeseFeatureTypeNames |
  ButterFeatureTypeNames |
  MilkFeatureTypeNames |
  MeatFeatureTypeNames |
  GroceryFeatureTypeNames |
  SnacksFeatureTypeNames;


export type CategoryNames =
  'Сир' |
  'Масло' |
  'Молочні вироби' |
  'М\`ясні вироби' |
  'Бакалія' |
  'Снеки';


export type CheeseFeatureTypeNames =
  'Жирність' |
  'Вид' |
  'Молочний склад';

export type ButterFeatureTypeNames =
  'Жирність' |
  'Об\'єм' |
  'Спосіб переробки'
  ;
export type MilkFeatureTypeNames =
  'Жирність';

export type MeatFeatureTypeNames =
  'Форма випуску';

export type GroceryFeatureTypeNames = '';

export type SnacksFeatureTypeNames = '';

