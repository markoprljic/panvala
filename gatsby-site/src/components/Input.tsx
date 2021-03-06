import * as React from 'react';
import styled from 'styled-components';
import {
  space,
  color,
  layout,
  typography,
  flexbox,
  border,
  background,
  shadow,
  position,
} from 'styled-system';
import { Field } from 'formik';


const StyledInput = styled(Field)`
  box-sizing: border-box;
  display: block;
  width: 100%;
  font-size: 0.875em;
  margin-top: 8px;
  padding: 16px 8px;
  border-radius: 8px;

  ${space};
  ${color};
  ${layout};
  ${typography};
  ${flexbox};
  ${border};
  ${background}
  ${shadow};
  ${position};
`;

const Input = props => {
  // console.log('props:', props);
  return <StyledInput className="input-reset b--black-10" {...props} />;
};

export default Input;
