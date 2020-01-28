import { createContext } from 'react';
import { Filter } from './filter';

interface GenericFilter {}

const FilterContext = createContext<Filter<GenericFilter>>({
  filter: {},
  pagination: {},
  setFilter: () => {},
  setActivePage: () => {}
})

export default FilterContext

const { Consumer, Provider } = FilterContext

export { Consumer, Provider }