import PropTypes from 'prop-types';

interface Pagination {
  activePage: number;
}

export interface Filter<T> {
  filter: T;
  pagination: Pagination;
  setFilter: Function;
  setActivePage: Function;
}

export const FilterPropsTypes = {
  filter: PropTypes.any,
  pagination: PropTypes.object,
  setFilter: PropTypes.func,
  setActivePage: PropTypes.func,
};