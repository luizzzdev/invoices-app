import { Select as BaseSelect, SelectProps } from 'semantic-ui-react';
import styled from 'styled-components'

const Select: React.FC<SelectProps> = styled(BaseSelect)`
  :not(:first-child) {
    margin-left: 10px;
  }
`

export default Select