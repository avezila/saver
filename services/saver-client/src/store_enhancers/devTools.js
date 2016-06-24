import React from 'react';
import { createStore as initialCreateStore, compose, applyMiddleware } from 'redux';

export let createStore = initialCreateStore;

import thunkMiddleware from 'redux-thunk';


if (__DEV__) {
  createStore = compose(
    applyMiddleware(thunkMiddleware),
    require('redux-devtools').devTools(),
    require('redux-devtools').persistState(
      window.location.href.match(/[?&]debug_session=([^&]+)\b/)
    ),
    createStore
  );
}else {
  createStore = compose(
    applyMiddleware(thunkMiddleware),
    createStore
  );
}

export function renderDevTools(store) {
  if (__DEV__) {
    let {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react');
    return (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
  }
  return null;
}
