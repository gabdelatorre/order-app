import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { connectRoutes } from 'redux-first-router';
import saga from 'redux-saga';

import { reducers } from './modules';
import { routesMap } from './routing/routesMap';
import { rootSaga } from './rootSaga';

const { enhancer, middleware, reducer } = connectRoutes(routesMap, {});
const rootReducer = combineReducers({
  location: reducer,
  ...reducers,
});
const sagaMiddleware = saga();
export const store = createStore(rootReducer, compose(enhancer, applyMiddleware(sagaMiddleware, middleware)));

export type LocationState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);
