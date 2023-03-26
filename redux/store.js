import { createStore, combineReducers } from 'redux';
import ordersReducer from './reducers';

const rootReducer = combineReducers({
  orders: ordersReducer,
});

const store = createStore(rootReducer);

export default store;
