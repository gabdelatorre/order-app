import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: #ffffff;
  box-shadow: 0 7px 14px 0 #e9ecef, 0 3px 6px 0 #ced4da;
  border-radius: 4px;
`;

export const Card = ({ children, ...others }: { children: ReactNode }) => {
  return <CardContainer {...others}> {children} </CardContainer>;
};

export const CardPadding = styled.div`
  padding: 21px;
`;

export const CardHeaderContainer = styled(CardPadding)`
  border-bottom: 2px solid #dddddd;
`;

const CardHeader: FC = ({ children, ...others }) => {
  return <CardHeaderContainer {...others}> {children} </CardHeaderContainer>;
};

const CardContent: FC = ({ children, ...others }) => {
  return <CardPadding {...others}> {children} </CardPadding>;
};

Card.Header = CardHeader;
Card.Content = CardContent;
