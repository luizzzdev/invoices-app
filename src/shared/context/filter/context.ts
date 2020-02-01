import { createContext } from 'react';

const FilterContext = createContext<any>({
  filter: {},
  pagination: { activePage: 1 },
  setFilter: () => {},
  setActivePage: () => {},
});

export default FilterContext;

const { Consumer, Provider } = FilterContext;

export { Consumer, Provider };