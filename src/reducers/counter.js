import {
  INCREMENT,
  DECREMENT,
  INCREMENT_IF_ODD,
} from 'actions/counter';

function counter (state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    case INCREMENT_IF_ODD:
      return state % 2 ? state + 1 : state;
    default:
      return state;
  }
}

export default counter;
