
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    currentOrderId: null,   //id of current order
    currentTable: 0,        //currently select table
};

let orderIdCounter = 0;

function generateOrderId() {
    orderIdCounter++;
    const orderIdString = orderIdCounter.toString().padStart(5, '0');
    return orderIdString;
}

const ordersSlice = createSlice({
    name:"allOrders",
    initialState,
    reducers:{
      createOrder: (state, action) => {
          state.currentTable=action.payload.tableNumber;
          const numberOfDiners=action.payload.numberOfDiners;
      
          const orderId = generateOrderId();
          const newOrder = {
            id: orderId,
            tableNumber:state.currentTable,
            numberOfDiners:numberOfDiners,
            tobeAddedDishes: [],
            haveBeenPlacedDishes: [],
            orderStatus: 1,               //1, ongoing; 0, finished or unstart
          };

          state.currentOrderId=orderId;
          state.orders=[...state.orders,newOrder];
          // console.log("State after creating order:", state);
      },
      addDishToShoppingCart: (state, action) => {

        const dishId=action.payload.dishId;
        const curTable=action.payload.currentTable;
        const orderId = state.currentOrderId;

        // find the index of the order in orders array 
        const orderIndex = state.orders.findIndex((order) => order.id === orderId );

        // create a new array of tobeAddedDishes for the updated order, add a new object.
        const tobeAddedDishes = [...state.orders[orderIndex].tobeAddedDishes, {
          dishId:dishId,
          dishQuantity:1
        }];
        
        // create a new object representing the updated order.
        const updatedOrder = {
          ...state.orders[orderIndex],
          tobeAddedDishes,
        };

        state.currentOrderId = orderId;

        // update order in orders
        state.orders=[
          ...state.orders.slice(0, orderIndex),
          updatedOrder,
          ...state.orders.slice(orderIndex+1)
        ];
        //console.log("State after creating order:", state.orders[orderIndex]);
      },
      removeDishFromShoppingCart:(state, action) => {
   
        const { currentOrderId: orderId, currentTable } = state;
        const { dishId } = action.payload;

        const orderIndex = state.orders.findIndex((order) => order.id === orderId && order.tableNumber === currentTable);
        if (orderIndex === -1) return;

        const { tobeAddedDishes } = state.orders[orderIndex];
        const dishIndex = tobeAddedDishes.findIndex((dish) => dish.dishId === dishId);
        if (dishIndex === -1) return;

        // remove the tobeAddedDishes[dishIndex], but operate on copied data.
        const updatedTobeAddedDishes = [...tobeAddedDishes.slice(0, dishIndex), ...tobeAddedDishes.slice(dishIndex + 1)];
        const updatedOrder = { ...state.orders[orderIndex], tobeAddedDishes: updatedTobeAddedDishes };
      
        //how to update orders?, the same
        state.orders=[
          ...state.orders.slice(0, orderIndex),
          updatedOrder,
          ...state.orders.slice(orderIndex+1)
        ];
        //console.log("State after creating order:", state.orders[orderIndex]);
      },
      changeDishQuantityInShoppingCart:(state, action) => {
        const { currentOrderId: orderId, currentTable } = state;
        const { dishId, slug } = action.payload;

        const orderIndex = state.orders.findIndex((order) => order.id === orderId && order.tableNumber === currentTable);
        if (orderIndex === -1) return;

        const { tobeAddedDishes } = state.orders[orderIndex];
        const dishIndex = tobeAddedDishes.findIndex((dish) => dish.dishId === dishId);
        if (dishIndex === -1) return;

        // Update the dishQuantity for the specified dishId
        const quantity = slug==="plus" ? 1:-1;
        console.log("quantity here is", quantity);
        const updatedTobeAddedDishes = tobeAddedDishes.map((dish) =>
          dish.dishId === dishId ? { ...dish, dishQuantity: dish.dishQuantity + quantity } : dish
        );
        console.log("updatedTo is",updatedTobeAddedDishes);

        const updatedOrder = { ...state.orders[orderIndex], tobeAddedDishes: updatedTobeAddedDishes };

        state.orders = [
          ...state.orders.slice(0, orderIndex),
          updatedOrder,
          ...state.orders.slice(orderIndex + 1),
        ];
      }
    }
  });

export const { 
  createOrder, 
  addDishToShoppingCart, 
  removeDishFromShoppingCart,
  changeDishQuantityInShoppingCart 
} = ordersSlice.actions;

export const selectCurrentTable = (state) => state.allOrders.currentTable;
export const selectCurrentOrder = (state) =>
  state.allOrders.orders.find((order) => order.id === state.allOrders.currentOrderId);
export const selectNumberOfDiners = (state) => 
  state.allOrders.orders.find((order) => order.id === state.allOrders.currentOrderId).numberOfDiners;
export const selectOrders = (state) => state.allOrders.orders;

export const selectDishQuantityByIdWrapper = (dishId) => (state) => {
  // This will create a closure that captures the dishId argument, 
  // and returns a selector function that takes the state and returns the desired dish object.
  // return state.allDishes.dishes.find((dish) => dish.id === dishId);
  // const { currentOrderId: orderId, currentTable } = state;
  const orderId = state.allOrders.currentOrderId;
  const curTable = state.allOrders.currentTable;
  // console.log("current OrderId  is", orderId);
  // console.log("curTable is", curTable);

  const orderIndex = state.allOrders.orders.findIndex((order) => order.id === orderId && order.tableNumber === curTable);
  // console.log("order index is", orderIndex);

  if (orderIndex === -1) return;
  // console.log("order index is", orderIndex);

  const { tobeAddedDishes } = state.allOrders.orders[orderIndex];
  // console.log("tobeAdded is", tobeAddedDishes);
  const dishIndex = tobeAddedDishes.findIndex((dish) => dish.dishId === dishId);
  if (dishIndex === -1) return;
  return tobeAddedDishes[dishIndex].dishQuantity;
}


export default ordersSlice.reducer;