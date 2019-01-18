import * as reducers from '../reducers';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers<ReduxState>(reducers),
  applyMiddleware(thunk)
);

export default store;
