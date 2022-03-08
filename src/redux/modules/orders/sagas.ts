import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { mockDeleteOrder, mockGetOrder } from './mocks';
import {
  TGetOrdersError,
  TGetOrdersSuccess,
  OrderActions,
  TDeleteOrderSuccess,
  TDeleteOrderError,
  TGetOrdersPending,
  TDeleteOrderPending,
  TOrderResponse,
} from './types';

export function* getOrdersSaga(action: TGetOrdersPending): SagaIterator<void> {
  try {
    // yield an api call here, but for now data is mocked
    const { data, totalSize }: TOrderResponse = yield call(mockGetOrder, action.payload);
    yield put<TGetOrdersSuccess>({ type: OrderActions.GET_ORDERS_SUCCESS, payload: { data, totalSize } });
  } catch (error) {
    yield put<TGetOrdersError>({ type: OrderActions.GET_ORDERS_ERROR });
  }
}

export function* deleteOrderSaga(action: TDeleteOrderPending): SagaIterator<void> {
  try {
    // yield an api call here, but for now data is mocked
    yield call(mockDeleteOrder, action.payload);
    yield put<TDeleteOrderSuccess>({ type: OrderActions.DELETE_ORDER_SUCCESS });
  } catch (error) {
    yield put<TDeleteOrderError>({ type: OrderActions.DELETE_ORDER_ERROR });
  }
}

export const orderSagas = [
  takeLatest(OrderActions.GET_ORDERS_PENDING, getOrdersSaga),
  takeLatest(OrderActions.DELETE_ORDER_PENDING, deleteOrderSaga),
];
