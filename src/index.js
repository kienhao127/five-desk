import React from "react";
import {render} from "react-dom";
import App from './App/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from "./store/configureStore";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

render(
  <Provider store={configureStore}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
