// Action Types
export const CREATE_ORDER = 'CREATE_ORDER';
export const SET_CURRENT_TABLE_NUMBER = 'SET_CURRENT_TABLE_NUMBER';
export const ADD_DISH_TO_CHART = 'ADD_DISH_TO_CHART';
export const REMOVE_DISH_FROM_CHART = 'REMOVE_DISH_FROM_CHART';
export const PLACE_ORDER = 'PLACE_ORDER';
export const CHECKOUT_ORDER = 'CHECKOUT_ORDER';

// Action Creators
export const createOrder = (tableNumber, numberOfDiners) => {
  return {
    type: CREATE_ORDER,
    payload: {
      tableNumber,
      numberOfDiners,
    },
  };
};

export const setCurrentTableNumber = (tableNumber) => {
  return {
    type: SET_CURRENT_TABLE_NUMBER,
    payload: {
      tableNumber,
    },
  };
};

export const addDishToChart = (dishId) => {
  return {
    type: ADD_DISH_TO_CHART,
    payload: {
      dishId,
    },
  };
};

export const removeDishFromChart = (dishId) => {
  return {
    type: REMOVE_DISH_FROM_CHART,
    payload: {
      dishId,
    },
  };
};

export const placeOrder = () => {
  return {
    type: PLACE_ORDER,
  };
};

export const checkoutOrder = () => {
  return {
    type: CHECKOUT_ORDER,
  };
};
