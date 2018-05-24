import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import App from 'containers';
import configureStore from './store';
import rootSaga from './sagas';

const Loading = () => (<div>Loading</div>);

const Home = () => (<div>Home</div>);

const Routers = () => {
  const routes = [{
    path: '/counter',
    component: () => import('containers/counter/'),
    exact: true,
  }, {
    path: '/login',
    component: () => import('containers/login/'),
    exact: true,
  }, {
    path: '/cart',
    component: () => import('containers/cart'),
    exact: true,
  }, {
    path: '/async',
    component: () => import('containers/async'),
    exact: true,
  }, {
    path: '/real',
    component: () => import('containers/real'),
    exact: false,
  }];
  return (
    <Router>
      <App>
        <Switch>
          <Route exact
            path="/"
            render={() => (
              <Redirect to="/home" />
            )}
          />
          <Route exact path="/home" component={Home} />
          {
            routes.map((item, index) => {
              return (
                <Route
                  exact={item.exact}
                  key={index}
                  path={item.path}
                  component={Loadable({
                    loader: item.component,
                    loading: Loading,
                  })}
                />
              );
            })
          }
        </Switch>
      </App>
    </Router>

  );
};

const store = configureStore();
store.runSaga(rootSaga);

const history = createHistory();

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routers />
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;
