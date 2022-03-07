import { TOrderActionTypes, TOrderState, OrderActions } from './types';

export const initialState: TOrderState = {
  orderList: [],
  totalOrderSize: 0,
  isLoading: false,
};

export const orders = (state = initialState, action: TOrderActionTypes): TOrderState => {
  switch (action.type) {
    case OrderActions.GET_ORDERS_PENDING:
      return {
        ...state,
        orderList: [],
        totalOrderSize: 0,
        isLoading: true,
      };
    case OrderActions.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orderList: action.payload.data,
        totalOrderSize: action.payload.totalSize,
        isLoading: false,
      };
    case OrderActions.GET_ORDERS_ERROR:
      return {
        ...state,
        totalOrderSize: 0,
        isLoading: false,
      };
    default:
      return state;
  }
};
