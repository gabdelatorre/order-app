import { Dispatch, ReactNode, ReactElement } from 'react';
import { render as testRenderer, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { AnyAction, Middleware } from 'redux';
import configureMockStore, { MockStoreCreator } from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { RootState } from '../redux/configureStore';

type TRecursivePartial<T> = {
  [P in keyof T]?: TRecursivePartial<T[P]>;
};
export function createMockStore(
  middlewares?: Middleware[]
): MockStoreCreator<Partial<RootState> | TRecursivePartial<RootState>, Dispatch<AnyAction>> {
  const sagaMiddleware = createSagaMiddleware();
  const defaultMiddleware = [sagaMiddleware];
  return configureMockStore(middlewares ?? defaultMiddleware);
}

export function wrapStore(
  tree: ReactNode,
  state: Partial<RootState> | TRecursivePartial<RootState> = {},
  middlewares?: Middleware[]
) {
  const mockStore = createMockStore(middlewares);
  const store = mockStore(state);

  return <Provider store={store}>{tree}</Provider>;
}
