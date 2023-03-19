// store.js
import { createStore, combineReducers } from 'redux';
import orderReducer from './reducers/orderReducer';

const rootReducer = combineReducers({
  orders: orderReducer,
});

const store = createStore(rootReducer);

export default store;
