import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MOCK_ORDERS } from '../../../redux/modules/orders/constants';
import { mockGetOrder } from '../../../redux/modules/orders/mocks';
import { initialState } from '../../../redux/modules/orders/reducers';
import { OrderActions, TGetOrderRequest } from '../../../redux/modules/orders/types';
import { wrapStore } from '../../../utils/testUtilities';
import { OrderListView } from '../OrderListView';
import * as orderActions from '../../../redux/modules/orders/actions';

const TEST_INITIAL_STORE = {
  orders: {
    orderList: MOCK_ORDERS,
    totalOrderSize: MOCK_ORDERS.length,
    isLoading: false,
  },
};

test('renders order list', () => {
  const { container } = render(wrapStore(<OrderListView />, TEST_INITIAL_STORE));
  expect(container.firstChild).not.toBeNull();
});

test('renders spinner when loading', () => {
  const spinnerStore = {
    orders: {
      ...TEST_INITIAL_STORE.orders,
      isLoading: true,
    },
  };
  render(wrapStore(<OrderListView />, spinnerStore));
  expect(screen.getByTestId('order-list-spinner')).not.toBeNull();
});

test('renders emptystate when no data is received', () => {
  const emptyStore = {
    orders: {
      ...TEST_INITIAL_STORE.orders,
      orderList: [],
    },
  };
  render(wrapStore(<OrderListView />, emptyStore));
  expect(screen.getByTestId('order-list-empty')).not.toBeNull();
});

test('displays active orders correctly', async () => {
  const reqPayload: TGetOrderRequest = {
    pageOption: {
      pageNumber: 1,
      pageSize: 10,
    },
    filterOption: [
      {
        column: 'status',
        value: 'active',
      },
    ],
  };
  const { data, totalSize } = await mockGetOrder(reqPayload);

  const completeStore = {
    orders: {
      ...TEST_INITIAL_STORE.orders,
      orderList: data,
      totalOrderSize: totalSize,
    },
  };

  render(wrapStore(<OrderListView />, completeStore));

  fireEvent.click(screen.getByTestId('tab-Active Orders'));
  await waitFor(() => {
    expect(screen.queryAllByText('Active Orders').length).toBe(2);
    expect(screen.queryByText('mo-21')).not.toBeInTheDocument();
    expect(screen.queryByText('mo-1')).toBeInTheDocument();
    expect(screen.queryByText('mo-2')).toBeInTheDocument();
    expect(screen.queryByText('mo-3')).toBeInTheDocument();
    expect(screen.queryByText('mo-4')).toBeInTheDocument();
    expect(screen.queryByText('mo-5')).toBeInTheDocument();
    expect(screen.queryByText('Showing 1 - 10 of 15')).toBeInTheDocument();
  });
});

test('displays 2nd page of active orders correctly', async () => {
  const reqPayload: TGetOrderRequest = {
    pageOption: {
      pageNumber: 2,
      pageSize: 10,
    },
    filterOption: [
      {
        column: 'status',
        value: 'active',
      },
    ],
  };
  const { data, totalSize } = await mockGetOrder(reqPayload);

  const completeStore = {
    orders: {
      ...TEST_INITIAL_STORE.orders,
      orderList: data,
      totalOrderSize: totalSize,
    },
  };

  render(wrapStore(<OrderListView />, completeStore));

  fireEvent.click(screen.getByTestId('pagination-page-2'));
  await waitFor(() => {
    expect(screen.queryAllByText('Active Orders').length).toBe(2);
    expect(screen.queryByText('mo-1')).not.toBeInTheDocument();
    expect(screen.queryByText('mo-11')).toBeInTheDocument();
    expect(screen.queryByText('mo-12')).toBeInTheDocument();
    expect(screen.queryByText('mo-13')).toBeInTheDocument();
    expect(screen.queryByText('mo-14')).toBeInTheDocument();
    expect(screen.queryByText('mo-15')).toBeInTheDocument();
    expect(screen.queryByText('Showing 11 - 15 of 15')).toBeInTheDocument();
  });
});

test('displays completed orders correctly', async () => {
  const reqPayload: TGetOrderRequest = {
    pageOption: {
      pageNumber: 1,
      pageSize: 10,
    },
    filterOption: [
      {
        column: 'status',
        value: 'completed',
      },
    ],
  };
  const { data, totalSize } = await mockGetOrder(reqPayload);

  const completeStore = {
    orders: {
      ...TEST_INITIAL_STORE.orders,
      orderList: data,
      totalOrderSize: totalSize,
    },
  };

  render(wrapStore(<OrderListView />, completeStore));

  fireEvent.click(screen.getByTestId('tab-Completed'));
  await waitFor(() => {
    expect(screen.queryAllByText('Completed').length).toBe(2);
    expect(screen.queryByText('mo-1')).not.toBeInTheDocument();
    expect(screen.queryByText('mo-16')).toBeInTheDocument();
    expect(screen.queryByText('mo-17')).toBeInTheDocument();
    expect(screen.queryByText('mo-18')).toBeInTheDocument();
    expect(screen.queryByText('mo-19')).toBeInTheDocument();
    expect(screen.queryByText('mo-20')).toBeInTheDocument();
    expect(screen.queryByText('Showing 1 - 5 of 5')).toBeInTheDocument();
  });
});

test('displays cancelled orders correctly', async () => {
  const reqPayload: TGetOrderRequest = {
    pageOption: {
      pageNumber: 1,
      pageSize: 10,
    },
    filterOption: [
      {
        column: 'status',
        value: 'cancelled',
      },
    ],
  };
  const { data, totalSize } = await mockGetOrder(reqPayload);

  const completeStore = {
    orders: {
      ...TEST_INITIAL_STORE.orders,
      orderList: data,
      totalOrderSize: totalSize,
    },
  };

  render(wrapStore(<OrderListView />, completeStore));

  fireEvent.click(screen.getByTestId('tab-Cancelled'));
  await waitFor(() => {
    expect(screen.queryAllByText('Cancelled').length).toBe(2);
    expect(screen.queryByText('mo-1')).not.toBeInTheDocument();
    expect(screen.queryByText('mo-21')).toBeInTheDocument();
    expect(screen.queryByText('Showing 1 - 1 of 1')).toBeInTheDocument();
  });
});

test('renders order details dialog upon click of row', () => {
  render(wrapStore(<OrderListView />, TEST_INITIAL_STORE));
  fireEvent.click(screen.getByTestId('order-list-row-mo-1'));
  expect(screen.getByText('Order Overview')).toBeInTheDocument();
});

describe('dispatches actions', () => {
  const reqPayload: TGetOrderRequest = {
    pageOption: {
      pageNumber: 1,
      pageSize: 10,
    },
    filterOption: [
      {
        column: 'status',
        value: 'completed',
      },
    ],
  };
  let getOrdersSpy: jest.SpyInstance<ReturnType<typeof orderActions.getOrders>>;
  let deleteOrderSpy: jest.SpyInstance<ReturnType<typeof orderActions.deleteOrder>>;

  beforeEach(() => {
    getOrdersSpy = jest.spyOn(orderActions, 'getOrders');
    getOrdersSpy.mockImplementation(() => ({
      type: OrderActions.GET_ORDERS_PENDING,
      payload: reqPayload,
    }));
    deleteOrderSpy = jest.spyOn(orderActions, 'deleteOrder');
    deleteOrderSpy.mockImplementation(() => ({
      type: OrderActions.DELETE_ORDER_PENDING,
      payload: 'mo-1',
    }));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('dispatches getOrders on load', () => {
    render(wrapStore(<OrderListView />, TEST_INITIAL_STORE));
    expect(getOrdersSpy).toHaveBeenCalledTimes(1);
  });

  it('dispatches getOrders on enter in search field', () => {
    render(wrapStore(<OrderListView />, TEST_INITIAL_STORE));
    const searchField = screen.getByPlaceholderText('Search by Customer');
    fireEvent.change(searchField, { target: { value: 'Test' } });
    fireEvent.keyPress(searchField, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(getOrdersSpy).toHaveBeenCalledTimes(2);
  });

  it('dispatches deleteOrder on click of row menu', async () => {
    render(wrapStore(<OrderListView />, TEST_INITIAL_STORE));
    const menuBtn = screen.getByTestId('order-list-menu-mo-1');
    fireEvent.click(menuBtn);
    await waitFor(() => {
      const deleteOption = screen.getByText('Delete');
      expect(deleteOption).not.toBeNull();
      fireEvent.click(deleteOption);
    });
    expect(deleteOrderSpy).toHaveBeenCalledTimes(1);
  });
});
