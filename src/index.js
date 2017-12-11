import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import registerServiceWorker from './services/registerServiceWorker';
import {createStore, applyMiddleware} from 'redux'
import reducer from './reducers'
import {Provider} from 'react-redux'

import './styles/index.css';


//TODO: need to better understand how to write custom middleware
const thunkMiddleware = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action);


const store = createStore(reducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <AppContainer />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
