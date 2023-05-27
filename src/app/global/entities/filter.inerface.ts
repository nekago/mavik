export type FilterState = Array<FilterFieldsGroup>

export interface FilterFieldsGroup {
	key: string;
	key_en: string;
	values: Array<FilterFieldsGroupValue>;
}

export interface FilterFieldsGroupValue {
  value: string,
  isActive: boolean
}

export type SelectedFilters = Record<string, string[]>

