/**
 * Created by Zerk on 18-Aug-17.
 */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import throttle from 'lodash/throttle';
import RootContainer from '@/containers/RootContainer';
import configureStore from '@/store';
import { saveState, loadState } from './localStorage';


const history = createHistory();
const persistedState = loadState();
const store = configureStore(persistedState);

store.subscribe(throttle(() => {
  saveState({
    backlog: store.getState().backlog,
    board: store.getState().board,
    sprints: store.getState().sprints,
    retro: store.getState().retro,
  });
}), 1000);

render(
  <AppContainer>
    <RootContainer store={store} history={history} />
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./containers/RootContainer', () => {
    const NewRoot = require('./containers/RootContainer').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
