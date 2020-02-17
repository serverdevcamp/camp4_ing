import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from 'react-redux';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import rootReducer from "./modules";

const store = createStore(rootReducer, composeWithDevTools());
ReactDOM.render(
  <Provider store={store}>
    <Root/>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
