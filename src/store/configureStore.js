import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index';

import RootSaga from '../saga/index';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware)
    )
    sagaMiddleware.run(RootSaga);
    return store
  }