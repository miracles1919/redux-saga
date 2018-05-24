import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from 'components/counter';
import {
  INCREMENT, DECREMENT, INCREMENT_IF_ODD, INCREMENT_ASYNC, CANCEL_INCREMENT_ASYNC,
} from 'actions/counter';


const Counter = ({
  dispatch, counter,
}) => {
  const onIncrement = () => {
    dispatch({ type: INCREMENT });
  };
  const onDecrement = () => {
    dispatch({ type: DECREMENT });
  };
  const onIncrementAsync = () => {
    dispatch({ type: INCREMENT_ASYNC });
  };
  const onIncrementIfOdd = () => {
    dispatch({ type: INCREMENT_IF_ODD });
  };
  const onCancel = () => {
    dispatch({ type: CANCEL_INCREMENT_ASYNC });
  };

  return (
    <div>
      <Item
        value={counter}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onIncrementAsync={onIncrementAsync}
        onIncrementIfOdd={onIncrementIfOdd}
        onCancel={onCancel}
      />
    </div>
  );
};

Counter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

const mapStateToProps = state => {
  console.log(state);
  return ({ counter: state.counter });
};

export default connect(mapStateToProps)(Counter);
