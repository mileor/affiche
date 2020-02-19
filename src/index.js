import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { HashRouter } from "react-router-dom"
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { loadState, saveState } from "./store/localStorage"
import rootReducer from "./store/reducers/rootReducer"
import throttle from "lodash/throttle"
import { createBrowserHistory } from 'history';

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});

const persistedState = loadState()

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

store.subscribe(throttle(() => {
    saveState({
        favorites: store.getState().favorites,
    });
}, 1000))

const app = (
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();