export type FilterState = Array<FilterFieldsGroup>

export interface FilterFieldsGroup {
	key: string;
	value: string[];
}
