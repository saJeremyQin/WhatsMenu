// actions/types.js
export const ADD_DISH = 'ADD_DISH';
export const REMOVE_DISH = 'REMOVE_DISH';
export const PLACE_ORDER = 'PLACE_ORDER';

// actions/orderActions.js
import { ADD_DISH, REMOVE_DISH, PLACE_ORDER } from './types';

export const addDish = (dish) => ({
  type: ADD_DISH,
  payload: dish,
});

export const removeDish = (dish) => ({
  type: REMOVE_DISH,
  payload: dish,
});

export const placeOrder = (order) => ({
  type: PLACE_ORDER,
  payload: order,
});
