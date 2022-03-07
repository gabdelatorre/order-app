import { createContext, Dispatch, FC, FunctionComponent, useContext, useEffect, useReducer, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Card, EmptyState, Pagination } from '../../components';
import { deleteOrder, getOrders } from '../../redux/modules/orders/actions';
import { OrderStatus, TGetOrderRequest, TOrderList } from '../../redux/modules/orders/types';
import { useTypedSelector } from '../../utils/useTypedSelector';
import { DEFAULT_PAGE_SIZE, DEFAULT_TABLE_STATE, OrderStatusTab, ORDER_TABS } from './constants';
import { StyledHeaderBreadcrumb, ViewContainer, SpinnerContainer } from './styles';
import tableReducer from './reducer';
import { TableActions, TTableActions } from './types';
import { Table, Spinner, Form, Button, Dropdown } from 'react-bootstrap';
import { OrderListFilters } from './OrderListFilters';

const StyledTable = styled(Table)`
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

const OrderTableContainer = styled.div`
  height: 660px;
  overflow: auto;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
`;

const MenuButton = styled(Dropdown.Toggle)`
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

interface TOrderListContext {
  orderList: TOrderList[];
  currentTablePage: number;
  totalOrderSize: number;
  isLoading: boolean;
  tableState: TGetOrderRequest;
  tableDispatch: Dispatch<TTableActions>;
  orderStatusTab: OrderStatusTab;
  handleTabChange: (idx: number) => void;
  handleDeleteOrder: (id: string) => void;
  handlePaginationChange: (pageNumber: number) => void;
}

const OrderListContext = createContext({} as TOrderListContext);

export const OrderListProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  const { orderList, totalOrderSize, isLoading } = useTypedSelector((state) => state.orders);
  const [tableState, tableDispatch] = useReducer(tableReducer, DEFAULT_TABLE_STATE);
  const [orderStatusTab, setOrderStatusTab] = useState<OrderStatusTab>(OrderStatusTab.ACTIVE);

  useEffect(() => {
    dispatch(getOrders(tableState));
  }, [dispatch, tableState]);

  const handleTabChange = (idx: number) => {
    setOrderStatusTab(idx);
    const tabFilter = { column: 'status', value: Object.values(OrderStatus)[idx] };
    //let filterOptions = [];

    //if (!tableState.filterOption) {
    //  filterOptions.push(tabFilter);
    //} else {
    //  const currentFilterOptions = tableState.filterOption.slice();
    //  const statusFilter = currentFilterOptions.find((filter) => filter.column === 'status');
    //  if (statusFilter) {
    //    statusFilter.value = Object.values(OrderStatus)[idx];
    //  } else {
    //    currentFilterOptions.push(tabFilter);
    //  }
    //  filterOptions = currentFilterOptions;
    //}

    tableDispatch({
      type: TableActions.SET_TABLE_OPTIONS,
      payload: {
        pageOption: { pageNumber: 1, pageSize: DEFAULT_PAGE_SIZE },
        searchOption: undefined,
        sortOption: undefined,
        filterOption: [tabFilter],
      },
    });
  };

  const handlePaginationChange = (pageNumber: number) => {
    tableDispatch({
      type: TableActions.SET_TABLE_PAGE,
      payload: {
        pageNumber,
        pageSize: DEFAULT_PAGE_SIZE,
      },
    });
  };

  const handleDeleteOrder = (id: string) => {
    dispatch(deleteOrder(id));
    handlePaginationChange(1);
  };

  const values = {
    orderList,
    totalOrderSize,
    isLoading,
    tableState,
    tableDispatch,
    currentTablePage: tableState.pageOption.pageNumber,
    orderStatusTab,
    handleTabChange,
    handleDeleteOrder,
    handlePaginationChange,
  };

  return <OrderListContext.Provider value={values}>{children}</OrderListContext.Provider>;
};

export const useOrderList = () => useContext(OrderListContext);

export const OrderList: FunctionComponent = () => {
  const {
    orderList,
    totalOrderSize,
    isLoading,
    currentTablePage,
    orderStatusTab,
    handleDeleteOrder,
    handlePaginationChange,
  } = useOrderList();

  const renderCardHeader = () => {
    return <OrderListFilters />;
  };

  const renderPagination = () => {
    const currentBaseIdx = 1 + DEFAULT_PAGE_SIZE * (currentTablePage - 1);
    const currentCeilIdx =
      currentBaseIdx + (orderList.length === DEFAULT_PAGE_SIZE ? DEFAULT_PAGE_SIZE : orderList.length) - 1;

    return (
      <PaginationContainer>
        <div> {`Showing ${currentBaseIdx} - ${currentCeilIdx} of ${totalOrderSize}`} </div>
        <Pagination
          active={currentTablePage}
          pageSize={DEFAULT_PAGE_SIZE}
          totalSize={totalOrderSize}
          onChange={handlePaginationChange}
        />
      </PaginationContainer>
    );
  };

  const renderCardContent = () => {
    if (isLoading) {
      return (
        <SpinnerContainer>
          <Spinner animation='border' />
        </SpinnerContainer>
      );
    } else if (orderList.length === 0) {
      return <EmptyState primaryMessage='No data found' secondaryMessage='We could not find requested orders' />;
    }
    return (
      <>
        <OrderTableContainer>
          <StyledTable hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Order Status</th>
                <th>Customer</th>
                <th>Total Price</th>
                <th>Payment Status</th>
                <th>Payment Method</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderList?.map((order) => {
                const createdDate = moment(order.createdDate).format('DD/MM/YYYY');
                console.log(createdDate);
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{createdDate.toString()}</td>
                    <td>{order.logisticStatus}</td>
                    <td>{order.customer}</td>
                    <td>{`${order.currency} ${order.totalPrice}`}</td>
                    <td>{order.paymentStatus}</td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      <Dropdown>
                        <MenuButton variant='success' id='dropdown-basic'>
                          <i className='fa-solid fa-ellipsis-vertical'></i>
                        </MenuButton>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleDeleteOrder(order.id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      {/*<IconButton>
                        <i className='fa-solid fa-ellipsis-vertical'></i>
                      </IconButton>*/}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </StyledTable>
        </OrderTableContainer>
        {renderPagination()}
      </>
    );
  };

  return (
    <ViewContainer>
      <StyledHeaderBreadcrumb active={ORDER_TABS[orderStatusTab]} />
      <Card>
        <Card.Header> {renderCardHeader()} </Card.Header>
        <Card.Content> {renderCardContent()} </Card.Content>
      </Card>
    </ViewContainer>
  );
};

export const OrderListView: FunctionComponent = () => {
  return (
    <OrderListProvider>
      {' '}
      <OrderList />{' '}
    </OrderListProvider>
  );
};
