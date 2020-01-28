interface State  {
  pagination: Object;
  filter: Object;
}


const ACTION_TYPES = {
  SET_FILTER: 'SET_FILTER',
  SET_ACTIVE_PAGE: 'SET_ACTIVE_PAGE'
}

interface Actions {
  type: string;
  payload: any;
}

const FilterReducer = (state: State, actions: Actions) => {
  switch(actions.type) {
    case ACTION_TYPES.SET_FILTER:
      const { propertyName, value } = actions.payload

      return {
        ...state,
        filter: {
          ...state.filter,
          [propertyName]: value
        }
      } 

    case ACTION_TYPES.SET_ACTIVE_PAGE:
      const { activePage } = actions.payload

      return {
        ...state,
        pagination: {
          ...state.pagination,
          activePage
        }
      }

      default: return state
  }
}

export default FilterReducer