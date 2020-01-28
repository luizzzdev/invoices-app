import { Consumer } from "./context";
import React from 'react'
import { Filter } from "./filter";

// @ts-ignore 
const withFilterConsumer = (WrappedComponent)  => (props) => {
  // @ts-ignore 
  return (
    // @ts-ignore 
    <Consumer>
      { (value: any) => <WrappedComponent {...value} {...props}/>}
    </Consumer>
  )
}

export default withFilterConsumer