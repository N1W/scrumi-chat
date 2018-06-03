/* eslint-disable global-require */
/**
 * Created by Zerk on 18-Aug-17.
 */

import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '@/reducers';

const middleware = [logger, routerMiddleware(history), thunk];

export default function (initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
  );

  if (module.hot) {
    module.hot.accept('@/reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
