import { MOCK_ORDERS } from '../constants';
import { OrderActions, TGetOrderRequest } from '../types';
import { orders as reducer } from '../reducers';
import { getOrders } from '../actions';

const TEST_PREV_STATE = {
  orderList: [],
  totalOrderSize: 0,
  isLoading: false,
};

test('orders reducer - get orders pending', () => {
  const reqPayload: TGetOrderRequest = {
    pageOption: {
      pageNumber: 1,
      pageSize: 10,
    },
  };

  expect(reducer(TEST_PREV_STATE, getOrders(reqPayload))).toEqual({
    orderList: [],
    totalOrderSize: 0,
    isLoading: true,
  });
});

test('orders reducer - get orders success', () => {
  const resPayload = {
    data: MOCK_ORDERS,
    totalSize: 30,
  };

  expect(reducer(TEST_PREV_STATE, { type: OrderActions.GET_ORDERS_SUCCESS, payload: resPayload })).toEqual({
    orderList: resPayload.data,
    totalOrderSize: resPayload.totalSize,
    isLoading: false,
  });
});

test('orders reducer - get orders error', () => {
  expect(reducer(TEST_PREV_STATE, { type: OrderActions.GET_ORDERS_ERROR })).toEqual({
    orderList: [],
    totalOrderSize: 0,
    isLoading: false,
  });
});
