import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import cart from './cart';
import async from './async';
import real from './real';

const rootReducer = combineReducers({
  counter,
  cart,
  async,
  real,
  router: routerReducer,
});

export default rootReducer;
