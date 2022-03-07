import { Action } from '../../types';

export enum OrderActions {
  GET_ORDERS_PENDING = '@orders/GET_ORDERS_PENDING',
  GET_ORDERS_SUCCESS = '@orders/GET_ORDERS_SUCCESS',
  GET_ORDERS_ERROR = '@orders/GET_ORDERS_ERROR',
  DELETE_ORDER_PENDING = '@orders/DELETE_ORDER_PENDING',
  DELETE_ORDER_SUCCESS = '@orders/DELETE_ORDER_SUCCESS',
  DELETE_ORDER_ERROR = '@orders/DELETE_ORDER_ERROR',
}

export enum SortValue {
  DEFAULT,
  ASC,
  DESC,
}

export interface TSortOption {
  column: string;
  value: SortValue;
}

export interface TSearchFilterOption {
  column: string;
  value: string;
}

export interface TPageOption {
  pageNumber: number;
  pageSize: number;
}

export interface TGetOrderRequest {
  pageOption: TPageOption;
  searchOption?: TSearchFilterOption;
  filterOption?: TSearchFilterOption[];
  sortOption?: TSortOption;
}

export enum OrderStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum LogisticStatus {
  TO_BE_PAID = 'to_be_paid',
  TO_PACK = 'to_pack',
  TO_SHIP = 'to_ship',
  IN_TRANSIT = 'in_transit',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum PaymentStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
}

export interface TCustomerInformation {
  customerName: string;
  mobileNumber: string;
  emailAddress: string;
  address: string;
}

export interface TProductDetails {
  productName: string;
  variant: string;
  quantity: number;
  price: number;
  currency: string;
}

export interface TProductInformation {
  items: TProductDetails[];
  deliveryFee: number;
  discount: number;
  currency: string;
}

export interface TLogisticInformation {
  logisticStatus: LogisticStatus;
  recipientAddress: string;
  deliveryProvider: string;
  weight: string;
  note: string;
}

export interface TOrderDetails {
  customer: TCustomerInformation;
  products: TProductInformation;
  logistics: TLogisticInformation;
}

export interface TOrderState {
  orderList: TOrderList[];
  totalOrderSize: number;
  isLoading: boolean;
}

export interface TOrderList {
  id: string;
  status: OrderStatus;
  createdDate: string;
  logisticStatus: LogisticStatus;
  customer: string;
  totalPrice: number;
  currency: string;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  data: TOrderDetails;
  [key: string]: unknown;
}

export interface TOrderResponse {
  data: TOrderList[];
  totalSize: number;
}

export type TGetOrdersPending = Action<typeof OrderActions.GET_ORDERS_PENDING, TGetOrderRequest>;
export type TGetOrdersSuccess = Action<typeof OrderActions.GET_ORDERS_SUCCESS, TOrderResponse>;
export type TGetOrdersError = Action<typeof OrderActions.GET_ORDERS_ERROR>;
export type TDeleteOrderPending = Action<typeof OrderActions.DELETE_ORDER_PENDING, string>;
export type TDeleteOrderSuccess = Action<typeof OrderActions.DELETE_ORDER_SUCCESS>;
export type TDeleteOrderError = Action<typeof OrderActions.DELETE_ORDER_ERROR>;

export type TOrderActionTypes =
  | TGetOrdersPending
  | TGetOrdersSuccess
  | TGetOrdersError
  | TDeleteOrderPending
  | TDeleteOrderSuccess
  | TDeleteOrderError;
