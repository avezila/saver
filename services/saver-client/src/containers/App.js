import React, { Component } from 'react';
import { combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import { createStore, renderDevTools } from '../store_enhancers/devTools';

import SaverApp from './SaverApp';
import * as reducers from '../reducers';

import {fetchRows} from '../actions';


const reducer = combineReducers(reducers);

const loggerMiddleware = createLogger()

const store = createStore(
  reducer
);

store.dispatch(fetchRows("",0,10));

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store} >
          {() => <SaverApp /> }
        </Provider>

        {renderDevTools(store)}
      </div>
    );
  }
}
