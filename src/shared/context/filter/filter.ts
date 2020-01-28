export interface Filter<T> {
  filter: T;
  pagination: any;
  setFilter: Function;
  setActivePage: Function;
}