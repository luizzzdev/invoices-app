import { Consumer } from './context';
import React from 'react'

const withFilterConsumer = (WrappedComponent: React.FC) => (props: any) => {
  return (
    <Consumer>
      {(value: any) => <WrappedComponent {...value} {...props} />}
    </Consumer>
  )
}

export default withFilterConsumer