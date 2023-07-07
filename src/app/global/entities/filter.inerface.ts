export type FilterState = Array<FilterFieldsGroup>


export type FilterTag = Array<[string, string]>

export interface FilterFieldsGroup {
	key: string;
	key_en: string;
	values: Array<FilterFieldsGroupValue>;
}

export interface FilterFieldsGroupValue {
  value: string,
  isActive: boolean,
  isChecked: boolean
}

export type SelectedFilters = Record<string, string[]>

export interface PriceRange {
  min: number,
  max: number,
}
