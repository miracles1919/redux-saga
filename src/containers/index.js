import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { openPages } from 'utils/config';
import 'normalize.css';

const App = ({ children, location }) => {
  const { pathname } = location;
  if (openPages.includes(pathname)) {
    return (
      <div>{children}</div>
    );
  }
  return (
    <div>
      <ul>
        <li><Link to="/counter">counter</Link></li>
        <li><Link to="/login">login</Link></li>
        <li><Link to="/cart">shopping-cart</Link></li>
        <li><Link to="/async">async</Link></li>
        <li><Link to="/real">real</Link></li>
      </ul>
      {children}
    </div>
  );
};


App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default hot(module)(withRouter(App));
