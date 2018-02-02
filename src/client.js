import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Main from 'containers/';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import Content from './containers/Home/components/Content';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const initialState = window.__INITIAL_STATE__;

ReactDOM.render(
  <Provider store={configureStore(initialState)}>
    <MuiThemeProvider>
      <Content />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);

// migrate by this guide
// https://github.com/gaearon/react-hot-loader/tree/master/docs#migration-to-30
if (module.hot) {
  module.hot.accept('containers/', () => {
    const NewMain = require('containers/').default;
    ReactDOM.render(
      <AppContainer>
        <NewMain />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
