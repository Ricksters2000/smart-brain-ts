import {createStore, applyMiddleware, AnyAction, compose} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk'
import rootReducer from '../features/rootReducer';
import {RootState} from '../features/rootReducer';
let window: Window & typeof globalThis | any;
window = globalThis;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, applyMiddleware(thunk/* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */));
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
  ));

export type AppDispatch = typeof store.dispatch;
export type TDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export default store;