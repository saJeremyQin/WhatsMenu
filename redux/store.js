// import { createStore, combineReducers } from 'redux';
// import ordersReducer from './reducers';

// const rootReducer = combineReducers({
//   orders: ordersReducer,
// });

// const store = createStore(rootReducer);

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import ordersSlice from "./slice";



export const store = configureStore({
  reducer: {
      allOrders: ordersSlice,
  }
});