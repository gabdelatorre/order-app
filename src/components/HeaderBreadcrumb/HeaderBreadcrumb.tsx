import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Card } from '../Card';
import { Breadcrumb } from 'react-bootstrap';

const HeaderContainer = styled(Card)`
  display: inline-block;
  padding: 14px;
  height: 52px;
`;

const StyledBreadcrumb = styled(Breadcrumb)`
  font-weight: 700;

  .breadcrumb-item > a {
    color: #4573ff;
    text-decoration: none;
  }
`;

interface THeaderBreadcrumb {
  active: string;
}

export const HeaderBreadcrumb = ({ active, ...others }: THeaderBreadcrumb & HTMLAttributes<HTMLDivElement>) => {
  return (
    <HeaderContainer {...others}>
      <StyledBreadcrumb>
        <Breadcrumb.Item> Orders </Breadcrumb.Item>
        <Breadcrumb.Item active> {active} </Breadcrumb.Item>
      </StyledBreadcrumb>
    </HeaderContainer>
  );
};
