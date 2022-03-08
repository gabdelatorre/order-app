import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { MOCK_ORDERS } from '../constants';
import { mockDeleteOrder, mockGetOrder } from '../mocks';
import { deleteOrderSaga, getOrdersSaga } from '../sagas';
import { OrderActions, TGetOrderRequest } from '../types';

test('getOrdersSaga', () => {
  const reqPayload: TGetOrderRequest = {
    pageOption: {
      pageNumber: 1,
      pageSize: 10,
    },
  };
  const apiResponse = {
    data: MOCK_ORDERS,
    totalSize: 10,
  };
  return expectSaga(getOrdersSaga, { type: OrderActions.GET_ORDERS_PENDING, payload: reqPayload })
    .provide([
      // Use the `call.fn` matcher from Redux Saga Test Plan
      [matchers.call.fn(mockGetOrder), apiResponse],
    ])
    .put({
      type: OrderActions.GET_ORDERS_SUCCESS,
      payload: apiResponse,
    })
    .run();
});

test('deleteOrderSaga', () => {
  const reqPayload = 'mod-1';
  return expectSaga(deleteOrderSaga, { type: OrderActions.DELETE_ORDER_PENDING, payload: reqPayload })
    .provide([
      // Use the `call.fn` matcher from Redux Saga Test Plan
      [matchers.call.fn(mockDeleteOrder), 'success'],
    ])
    .put({
      type: OrderActions.DELETE_ORDER_SUCCESS,
    })
    .run();
});
