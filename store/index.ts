import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers/rootReducer';
import appSagas from './sagas';
// create middleware of redux-saga
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer as any, applyMiddleware(sagaMiddleWare));
// run saga
sagaMiddleWare.run(appSagas);
export default store;
