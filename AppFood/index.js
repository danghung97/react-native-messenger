/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './src/store/reducer/RootReducer';
import rootSaga from './src/store/saga/RootSaga';


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

const app = () => (
<Provider store={store}>
        <App/>
    </Provider>
)

AppRegistry.registerComponent(
    appName, () => app);
