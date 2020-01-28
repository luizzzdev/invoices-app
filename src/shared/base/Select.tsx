import { Select as BaseSelect, SelectProps } from "semantic-ui-react";
import styled from 'styled-components'

// @ts-ignore
const Select = styled<SelectProps>(BaseSelect)`
  :not(:first-child) {
    margin-left: 10px;
  }
`

export default Select