import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import { AppRegistry } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './src/store/reducer/RootReducer';
import RootSaga from './src/store/saga/RootSaga';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    RootReducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(RootSaga)
const app = () => (
    <Provider store={store}>
        <App/>
    </Provider>
)

AppRegistry.registerComponent(
    appName, () => app);