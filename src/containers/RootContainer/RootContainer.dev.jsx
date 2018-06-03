/**
 * Created by Zerk on 18-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import App from '@/components/App';

const propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

const RootContainer = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>
);

RootContainer.propTypes = propTypes;

export default RootContainer;
