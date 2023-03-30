import {
  CREATE_ORDER,
  SET_CURRENT_TABLE_NUMBER,
  ADD_DISH_TO_CHART,
  REMOVE_DISH_FROM_CHART,
  PLACE_ORDER,
  CHECKOUT_ORDER,
} from './actions';

const initialOrderState = {
  orders: [],
  currentOrder: null,     //current order of selected table
  currentTable: 0,        //currently select table
};

let orderIdCounter = 0;

function generateOrderId() {
  orderIdCounter++;
  const orderIdString = orderIdCounter.toString().padStart(5, '0');
  return orderIdString;
}





const ordersReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case CREATE_ORDER: {
      const { tableNumber, numberOfDiners } = action.payload;
      const orderId = generateOrderId();
      const newOrder = {
        id: orderId,
        tableNumber,
        numberOfDiners,
        tobeAddedDishes: [],
        haveBeenPlacedDishes: [],
        orderStatus: 1,         //1, ongoing; 0, finished or unstart
      };
      return {
        ...state,
        currentOrder: newOrder,
        orders: [...state.orders, newOrder],
        currentTable: tableNumber,
      };
    }
    // might no use, because no current_table_number without an order
    case SET_CURRENT_TABLE_NUMBER: {
      const { tableNumber } = action.payload;
      const order = state.orders.find((order) => order.tableNumber === tableNumber);
      return {
        ...state,
        currentOrder: order,
        currentTable: tableNumber,
      };
    }
    case ADD_DISH_TO_CHART: {
      const { dishId } = action.payload;
      const { orders } = state;
      const { orderId, tableNumber } = state.currentOrder;
    
      // find the current order in orders, which needs to be updated.
      const orderIndex = orders.findIndex(order => order.orderId === orderId && order.tableNumber === tableNumber);
      const orderToUpdate = orders[orderIndex];
      // update dishes in tobeAddedDishes array
      const tobeAddedDishes = [...orderToUpdate.tobeAddedDishes, dishId];
    
      const updatedOrder = {
        ...orderToUpdate,
        tobeAddedDishes,
      };
    
      const updatedOrders = [
        ...orders.slice(0, orderIndex),
        updatedOrder,
        ...orders.slice(orderIndex + 1)
      ];
    
      return {
        ...state,
        orders: updatedOrders,
        currentOrder: updatedOrder,
      };
    }
    // find dishIndex both in currentOrder and in orders Array 
    case REMOVE_DISH_TO_CHART: {
      const { dishId } = action.payload;
      const { currentOrder } = state;
      const tobeAddedDishes = [...currentOrder.tobeAddedDishes];
      const dishIndex = tobeAddedDishes.findIndex((id) => id === dishId);
      if (dishIndex !== -1) {
        tobeAddedDishes.splice(dishIndex, 1);
      }
      const updatedOrder = {
        ...currentOrder,
        tobeAddedDishes,
      };
      const { orders } = state;
      const orderIndex = orders.findIndex((order) => order.orderId === currentOrder.orderId);
      if (orderIndex === -1) {
        // Order not found, return the original state
        return state;
      }
      const updatedOrders = [...orders];
      updatedOrders[orderIndex] = updatedOrder;
      return {
        ...state,
        currentOrder: updatedOrder,
        orders: updatedOrders,
      };
    }
    case PLACE_ORDER: {
      const { currentOrder } = state;
      const { tobeAddedDishes, haveBeenPlacedDishes } = currentOrder;
    
      if (tobeAddedDishes.length === 0) {
        // If there are no dishes to be added, return the same state
        return state;
      }
    
      const updatedOrder = {
        ...currentOrder,
        tobeAddedDishes: [],
        haveBeenPlacedDishes: [...haveBeenPlacedDishes, ...tobeAddedDishes],
      };
    
      const ordersIndex = state.orders.findIndex((order) => order.orderId === currentOrder.orderId);
    
      if (ordersIndex < 0) {
        // If the current order doesn't exist in the orders array, return the same state
        return state;
      }
    
      const updatedOrders = [...state.orders];
      updatedOrders[ordersIndex] = updatedOrder;
    
      return {
        ...state,
        currentOrder: updatedOrder,
        orders: updatedOrders,
      };
    }
    // If you want to keep a history of past orders, it might be better to set the order as null, so that it can still be accessed 
    // in the future if needed. On the other hand, if you don't need to keep a history and want to free up memory, 
    // deleting the order from the orders array could be a good option.
    case CHECKOUT_ORDER: {
      const { currentOrder, currentTable, orders } = state;
      const updatedOrders = orders.filter(order => order.orderId !== currentOrder.orderId);
      return {
        ...state,
        currentOrder: null,
        currentTable: 0,
        orders: updatedOrders,
      };
    }
    
    
    default:
      return state;
  }
};

export default ordersReducer;
