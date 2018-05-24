import { delay } from 'redux-saga';
import { put, fork, take, cancelled, race, call } from 'redux-saga/effects';
import { INCREMENT, INCREMENT_ASYNC, CANCEL_INCREMENT_ASYNC } from 'actions/counter';

export function* incrementAsync () {
  try {
    yield delay(1000);
  } finally {
    if (!(yield cancelled())) {
      yield put({ type: INCREMENT });
    }
  }
}

export function* watchIncrementAsync () {
  while (true) {
    try {
      yield take(INCREMENT_ASYNC);
      yield race([call(incrementAsync), take(CANCEL_INCREMENT_ASYNC)]);
    } catch (e) {
      console.log(e);
    }
  }
}

export default function* counter () {
  yield fork(watchIncrementAsync);
}
