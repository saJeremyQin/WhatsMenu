// reducers/orderReducer.js
import { ADD_DISH, REMOVE_DISH, PLACE_ORDER } from '../actions/types';

const initialState = {
  currentTable: null,
  currentOrder: {
    orderItems: [],
    total: 0,
    numberOfDiners: 0,
  },
  ordersHistory: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DISH:
      // add dish to the current order
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          orderItems: [...state.currentOrder.orderItems, action.payload],
          total: state.currentOrder.total + action.payload.price,
        },
      };
    case REMOVE_DISH:
      // remove dish from the current order
      const updatedOrderItems = state.currentOrder.orderItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          orderItems: updatedOrderItems,
          total: state.currentOrder.total - action.payload.price,
        },
      };
    case PLACE_ORDER:
      // place order and add it to the orders history
      return {
        ...state,
        currentOrder: {
          orderItems: [],
          total: 0,
          numberOfDiners: 0,
        },
        ordersHistory: [...state.ordersHistory, action.payload],
      };
    default:
      return state;
  }
};

export default orderReducer;
