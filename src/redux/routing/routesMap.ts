import { RoutesMap } from 'redux-first-router';

export const Routes = {
  ORDERLIST: '@route/ORDERLIST',
} as const;

export const routesMap: RoutesMap = {
  [Routes.ORDERLIST]: {
    path: '/',
  },
};
