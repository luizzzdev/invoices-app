import React, { useMemo, useReducer } from 'react';
import { Provider } from './context';
import FilterReducer from './reducer';
import PropTypes from 'prop-types';

const defaultState = {
  filter: {},
  pagination: { activePage: 1 },
};

type FilterProviderProps = {
  initialState: object;
}

const FilterProvider: React.FC<FilterProviderProps> = ({ children, initialState }) => {
  const [state, dispatch] = useReducer(FilterReducer, { ...defaultState, ...initialState });

  const setFilter = (propertyName: string, value: any) => {
    dispatch({ type: 'SET_FILTER', payload: { propertyName, value } });
  };

  const setActivePage = (activePage: number) => {
    dispatch({ type: 'SET_ACTIVE_PAGE', payload: { activePage } });
  };

  const value = useMemo(() => ({
    filter: state.filter,
    pagination: state.pagination,
    setFilter,
    setActivePage,
  }), [state.filter, state.pagination]);

  return (
    <Provider value={value}>
      {children}
    </Provider>
  );
};

FilterProvider.defaultProps = {
  initialState: {},
};

FilterProvider.propTypes = {
  // @ts-ignore
  children: PropTypes.any,
  initialState: PropTypes.object,
};

export default FilterProvider;