import type { Action as ReduxAction } from 'redux';

export type Action<T, P = undefined> = P extends undefined ? ReduxAction<T> : ReduxAction<T> & { payload: P };
