import { Dropdown, Table } from 'react-bootstrap';
import styled from 'styled-components';
import { HeaderBreadcrumb } from '../../components';

export const ViewContainer = styled.div`
  height: 100vh;
  padding: 24px;
  background-color: #efefef;
`;

export const StyledHeaderBreadcrumb = styled(HeaderBreadcrumb)`
  margin-bottom: 24px;
`;

export const CardHeader = styled.div`
  padding: 14px;
  border-bottom: 2px solid #dddddd;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  height: 710px;
  align-items: center;
  justify-content: center;
`;

export const StyledTable = styled(Table)`
  font-size: 12px;

  th {
    text-transform: uppercase;
  }

  tr:hover {
    cursor: pointer;
    background-color: #fafafa;
  }

  td {
    height: 60px;
    vertical-align: middle;
    border-bottom: 1px solid #dfdfdf;
  }
`;

export const OrderTableContainer = styled.div`
  height: 660px;
  overflow: auto;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
`;

export const MenuButton = styled(Dropdown.Toggle)`
  background-color: transparent;
  border: none;
  outline: none;
  box-shadow: none !important;

  :after {
    display: none;
  }

  &:active,
  &:focus {
    outline: none;
  }

  &:hover,
  &:active,
  &:focus {
    background-color: #4a4a4a !important;
    i {
      color: #ffffff !important;
    }
  }

  i {
    color: #4a4a4a;
  }
`;
