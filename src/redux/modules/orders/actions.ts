import { OrderActions, TGetOrderRequest, TOrderActionTypes } from './types';

export const getOrders = (req: TGetOrderRequest): TOrderActionTypes => ({
  type: OrderActions.GET_ORDERS_PENDING,
  payload: req,
});

export const deleteOrder = (id: string): TOrderActionTypes => ({
  type: OrderActions.DELETE_ORDER_PENDING,
  payload: id,
});
