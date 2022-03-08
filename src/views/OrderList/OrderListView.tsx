import { createContext, FC, FunctionComponent, MouseEvent, useContext, useEffect, useReducer, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { Card, EmptyState, Pagination } from '../../components';
import { deleteOrder, getOrders } from '../../redux/modules/orders/actions';
import { OrderStatus } from '../../redux/modules/orders/types';
import { useTypedSelector } from '../../utils/useTypedSelector';
import { DEFAULT_PAGE_SIZE, DEFAULT_TABLE_STATE, OrderStatusTab, ORDER_TABS } from './constants';
import {
  StyledHeaderBreadcrumb,
  ViewContainer,
  SpinnerContainer,
  StyledTable,
  OrderTableContainer,
  PaginationContainer,
  MenuButton,
} from './styles';
import tableReducer from './reducer';
import { TableActions, TOrderListContext } from './types';
import { Spinner, Dropdown } from 'react-bootstrap';
import { OrderListFilters } from './OrderListFilters';
import { OrderDetails } from '../OrderDetails';
import { TOrderDetailsDialogData } from '../OrderDetails/types';

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
  const [currentOrder, setCurrentOrder] = useState<TOrderDetailsDialogData | undefined>();

  const handleViewDetails = (props: TOrderDetailsDialogData) => () => {
    setCurrentOrder(props);
  };

  const handleCloseDetails = () => {
    setCurrentOrder(undefined);
  };

  const handleMenuClick = (id: string) => (event: MouseEvent) => {
    event.stopPropagation();
    handleDeleteOrder(id);
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

  const renderTable = () => {
    if (isLoading) {
      return (
        <SpinnerContainer data-testid='order-list-spinner'>
          <Spinner animation='border' />
        </SpinnerContainer>
      );
    } else if (orderList.length === 0) {
      return (
        <div data-testid='order-list-empty'>
          <EmptyState primaryMessage='No data found' secondaryMessage='We could not find requested orders' />
        </div>
      );
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
                return (
                  <tr
                    data-testid={`order-list-row-${order.id}`}
                    key={order.id}
                    onClick={handleViewDetails({
                      paymentStatus: order.paymentStatus,
                      details: order.data,
                      createdDate: order.createdDate,
                    })}
                  >
                    <td>{order.id}</td>
                    <td>{createdDate}</td>
                    <td>{order.logisticStatus}</td>
                    <td>{order.customer}</td>
                    <td>{`${order.currency} ${order.totalPrice}`}</td>
                    <td>{order.paymentStatus}</td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      <Dropdown>
                        <div onClick={(e: MouseEvent) => e.stopPropagation()}>
                          <MenuButton data-testid={`order-list-menu-${order.id}`} variant='success' id='dropdown-basic'>
                            <i className='fa-solid fa-ellipsis-vertical'></i>
                          </MenuButton>
                        </div>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={handleMenuClick(order.id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
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
        <Card.Header>
          <OrderListFilters />
        </Card.Header>
        <Card.Content> {renderTable()} </Card.Content>
      </Card>
      <OrderDetails data={currentOrder} visible={Boolean(currentOrder)} onClose={handleCloseDetails} />
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
