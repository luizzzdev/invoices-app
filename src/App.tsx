import React from 'react';
import Invoices from './invoices/Invoices';
import FilterProvider from './shared/context/filter/FilterProvider';

const initialState = {
  pagination: { activePage: 1},
  filter: {},
};

const App: React.FC = () => {
  return (
    <div className="App">
      <FilterProvider initialState={initialState}>
        <Invoices />
      </FilterProvider>
    </div>
  );
};

export default App;
