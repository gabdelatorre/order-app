import { SagaIterator } from 'redux-saga';
import { all } from 'redux-saga/effects';
import { orderSagas } from './modules/orders/sagas';

export function* rootSaga(): SagaIterator {
  yield all([...orderSagas]);
}
