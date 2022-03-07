import { TGetOrderRequest, TPageOption, TSearchFilterOption, TSortOption } from '../../redux/modules/orders/types';
import type { Action as ReduxAction } from 'redux';

export enum TableActions {
  SET_TABLE_OPTIONS = '@table/SET_TABLE_OPTIONS',
  SET_TABLE_PAGE = '@table/SET_TABLE_PAGE',
  SET_TABLE_SEARCH = '@table/SET_TABLE_SEARCH',
  SET_TABLE_FILTER = '@table/SET_TABLE_FILTER',
  SET_TABLE_SORT = '@table/SET_TABLE_SORT',
}

type Action<T, P = undefined> = ReduxAction<T> & { payload: P };

export type TSetTableOptions = Action<typeof TableActions.SET_TABLE_OPTIONS, TGetOrderRequest>;
export type TSetTablePage = Action<typeof TableActions.SET_TABLE_PAGE, TPageOption>;
export type TSetTableSearch = Action<typeof TableActions.SET_TABLE_SEARCH, TSearchFilterOption | undefined>;
export type TSetTableFilter = Action<typeof TableActions.SET_TABLE_FILTER, TSearchFilterOption[] | undefined>;
export type TSetTableSort = Action<typeof TableActions.SET_TABLE_SORT, TSortOption | undefined>;

export type TTableActions = TSetTableOptions | TSetTablePage | TSetTableSearch | TSetTableFilter | TSetTableSort;
