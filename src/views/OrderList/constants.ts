import { TGetOrderRequest } from '../../redux/modules/orders/types';

export const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_TABLE_STATE: TGetOrderRequest = {
  pageOption: {
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  filterOption: [
    {
      column: 'status',
      value: 'active',
    },
  ],
};

export enum OrderStatusTab {
  ACTIVE,
  COMPLETED,
  CANCELLED,
}

export const ORDER_TABS = ['Active Orders', 'Completed', 'Cancelled'];
