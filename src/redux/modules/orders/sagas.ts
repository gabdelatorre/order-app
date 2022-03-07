import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { MOCK_ORDERS } from './constants';
import {
  TGetOrdersError,
  TGetOrdersSuccess,
  OrderActions,
  TOrderList,
  TGetOrderRequest,
  TDeleteOrderSuccess,
  TDeleteOrderError,
  TGetOrdersPending,
  TDeleteOrderPending,
  TOrderResponse,
} from './types';

const MOCK_API_RESPONSE_TIME = 800;
const mockGetOrder = async (req: TGetOrderRequest) => {
  const { pageOption, sortOption, filterOption, searchOption } = req;
  console.log('api call', pageOption, sortOption, filterOption, searchOption);

  return new Promise<TOrderResponse>((res) => {
    setTimeout(() => {
      let orderList: TOrderList[] = MOCK_ORDERS;

      // filter data based on searchOption
      if (searchOption) {
        orderList = orderList.filter((order) => order[searchOption.column] === searchOption.value);
      }

      // filter data based on filterOption
      if (filterOption) {
        filterOption.forEach((filter) => {
          orderList = orderList.filter((order) => order[filter.column] === filter.value);
        });
      }

      const filteredLength = orderList.length;

      // slice data based on pageOption
      if (pageOption) {
        const { pageNumber, pageSize } = pageOption;
        const startIdx = (pageNumber - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        orderList = orderList.slice(startIdx, endIdx);
      }

      res({ data: orderList, totalSize: filteredLength });
    }, MOCK_API_RESPONSE_TIME);
  });
};

const mockDeleteOrder = async (id: string) => {
  console.log('mockDeleteOrder', id);
  return new Promise((res) => {
    setTimeout(() => {
      const orderToDelete = MOCK_ORDERS.findIndex((order) => order.id === id);
      MOCK_ORDERS.splice(orderToDelete, 1);
      res('success');
    }, MOCK_API_RESPONSE_TIME);
  });
};

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
