import { Consumer } from './context';
import React, { FunctionComponent, ComponentType } from 'react';

const withFilterConsumer = <P extends object>(WrappedComponent: ComponentType<P>): FunctionComponent<P> => (props: P)  => {
  return (
    <Consumer>
      {(value) => <WrappedComponent {...value} {...props} />}
    </Consumer>
  );
};

export default withFilterConsumer;
