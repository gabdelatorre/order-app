import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

export const DetailWrapper = styled.div`
  margin-bottom: 32px;

  h6 {
    padding-left: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 0 12px;
`;

export const TotalPriceRow = styled(Row)`
  font-weight: 700;
`;

export const LogisticsCol = styled(Col)`
  text-transform: capitalize;
`;

export const HeaderCol = styled(Col)`
  font-weight: 700;
`;

export const HeaderPriceCol = styled(HeaderCol)`
  text-align: right;
`;

export const PriceCol = styled(Col)`
  text-align: right;
`;

export const DiscountCol = styled(PriceCol)`
  text-align: right;
  color: #50a14f;
`;

export const GutterRow = styled.div`
  margin-bottom: 16px;
`;

export const PaymentWrapper = styled.div<{ isPaid: boolean }>`
  font-weight: 700;
  color: ${({ isPaid }) => (isPaid ? '#50a14f' : '#f44747')};
`;
