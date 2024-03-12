// store.js
import { combineReducers, createStore, applyMiddleware } from 'redux';
import counterReducer from './reducers/reducers';
import challengeReducer from './reducers/challengeReducers';
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({
  counter: counterReducer,
  challenges: challengeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;