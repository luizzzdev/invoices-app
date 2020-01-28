import React, { useMemo, useState, useCallback, useReducer } from 'react'
import { Provider } from './context'
import FilterReducer from './store'


const defaultState = {
  filter: {},
  pagination: { activePage: 1 }
}



// @ts-ignore
const FilterProvider = ({ children, initialState }) => {
  // const [filter, setFilter] = useState<any>({})

  // @ts-ignore
  const [state, dispatch] = useReducer(FilterReducer, {...defaultState, ...initialState})

  // const setPropertyInFilter = useCallback((propertyName: string, value: any) => {
  //   setFilter((prevState: any) => ({
  //     ...prevState,
  //     [propertyName]: value
  //   }))
  // }, [])

  const setFilter = (propertyName: string, value: any) => {
    dispatch({ type: 'SET_FILTER', payload: { propertyName, value }})
  }

  const setActivePage = (activePage: number) => {
    dispatch({ type: 'SET_ACTIVE_PAGE', payload: { activePage }})
  }

  const value = useMemo(() => ({
    filter: state.filter,
    pagination: state.pagination,
    setFilter,
    setActivePage
  }), [state.filter, state.pagination])

  console.log('Rendering again with state: ', state)


  return (
    <Provider value={value}>
      {children}
    </Provider>
  )
}

export default FilterProvider