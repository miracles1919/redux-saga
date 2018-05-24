import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { navigate, updateRouterState, resetErrorMessage } from 'actions/real';
import Explore from 'components/real/Explore';


class App extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDismissClick = this.handleDismissClick.bind(this);
  }

  // componentWillMount () {
  //   console.log('this.props', this.props);
  //   this.props.updateRouterState({
  //     pathname: this.props.location.pathname,
  //     params: this.props.params,
  //   });
  // }

  // componentWillReceiveProps (nextProps) {
  //   if (this.props.location.pathname !== nextProps.location.pathname) {
  //     console.log('nextProps', nextProps);
  //     this.props.updateRouterState({
  //       pathname: nextProps.location.pathname,
  //       params: nextProps.params,
  //     });
  //   }
  // }

  handleDismissClick (e) {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  handleChange (nextValue) {
    this.props.navigate(`/${nextValue}`);
  }

  renderErrorMessage () {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
          onClick={this.handleDismissClick}
        >
          Dismiss
         </a>)
      </p>
    );
  }

  render () {
    const { children, inputValue } = this.props;
    return (
      <div>
        <Explore value={inputValue}
          onChange={this.handleChange}
        />
        <hr />
        {this.renderErrorMessage()}
        {children}
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  // updateRouterState: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node,
  // location: PropTypes.object,
  // params: PropTypes.object,
};

function mapStateToProps (state) {
  return {
    errorMessage: state.real.errorMessage,
    inputValue: state.real.router.pathname.substring(5),
  };
}

export default connect(mapStateToProps, {
  navigate,
  updateRouterState,
  resetErrorMessage,
})(withRouter(App));
