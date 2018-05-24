import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const history = createHistory();
const routerMiddleware = createRouterMiddleware(history);

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(sagaMiddleware, routerMiddleware)
  );

  store.runSaga = sagaMiddleware.run;
  return store;
};

export default configureStore;
