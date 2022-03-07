import { TGetOrderRequest } from '../../redux/modules/orders/types';
import { DEFAULT_TABLE_STATE } from './constants';
import { TableActions, TTableActions } from './types';

const tableReducer = (state = DEFAULT_TABLE_STATE, action: TTableActions): TGetOrderRequest => {
  switch (action.type) {
    case TableActions.SET_TABLE_OPTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case TableActions.SET_TABLE_PAGE:
      return {
        ...state,
        pageOption: action.payload,
      };
    case TableActions.SET_TABLE_SEARCH:
      return {
        ...state,
        searchOption: action.payload,
      };
    case TableActions.SET_TABLE_FILTER:
      return {
        ...state,
        filterOption: action.payload,
      };
    case TableActions.SET_TABLE_SORT:
      return {
        ...state,
        sortOption: action.payload,
      };
    default:
      throw new Error();
  }
};

export default tableReducer;
