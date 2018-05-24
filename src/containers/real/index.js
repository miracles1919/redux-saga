import React from 'react';
import { Route } from 'react-router-dom';

import App from './App';
import UserPage from './UserPage';
import RepoPage from './RepoPage';

const Real = () => (
  <App>
    <Route path="/real/:login" exact component={UserPage} />
    <Route path="/real/:login/:name" exact component={RepoPage} />
  </App>
);


export default Real;
