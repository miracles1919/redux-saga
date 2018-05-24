import { takeEvery, call, all, fork, put, select, take } from 'redux-saga/effects';
import { GET_ALL_PRODUCTS, receiveProducts, CHECKOUT_REQUEST, checkoutSuccess } from 'actions/cart';
import { getProducts, buyProducts } from 'services/cart';
import { getCart } from 'reducers/cart';

export function* getAllProducts () {
  const products = yield call(getProducts);
  yield put(receiveProducts(products));
}

export function* watchGetProducts () {
  yield takeEvery(GET_ALL_PRODUCTS, getAllProducts);
}

export function* checkout () {
  const cart = yield select(getCart);
  yield call(buyProducts, cart);
  yield put(checkoutSuccess(cart));
}

export function* watchCheckout () {
  while (true) {
    yield take(CHECKOUT_REQUEST);
    yield call(checkout);
  }
}

export default function* cart () {
  yield all([fork(getAllProducts), fork(watchCheckout)]);
}
