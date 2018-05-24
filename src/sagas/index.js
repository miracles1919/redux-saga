import { all, fork } from 'redux-saga/effects';
import counter from './counter';
import cart from './cart';
import async from './async';
import real from './real';

export default function* rootSaga () {
  yield all([
    fork(counter),
    fork(cart),
    fork(async),
    fork(real),
  ]);
}
