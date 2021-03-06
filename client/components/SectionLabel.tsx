import * as React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';
import { COLORS } from '../styles';

const StyledSectionLabel = styled.div`
  margin: ${(props: any) => (props.lessMargin ? '1rem 0' : '1rem 0 2rem')};
  font-size: 0.75rem;
  font-weight: 500;
  color: ${COLORS.grey3};
  ${space};
`;

const SectionLabel: React.FunctionComponent<any> = props => {
  return <StyledSectionLabel {...props} />;
};

export default SectionLabel;
