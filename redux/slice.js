
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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

const ordersSlice = createSlice({
    name:"allOrders",
    initialState,
    reducers:{
      createOrder: (state, action) => {
          // const { tableNumber, numberOfDiners } = action.payload;
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

          state.currentOrder=newOrder;
          state.orders=[...state.orders,newOrder];
          // console.log("State after creating order:", state);
      },
      addDishToShoppingCart: (state, action) => {

        const dishId=action.payload.dishId;
        const curTable=action.payload.currentTable;

        // update dishes in tobeAddedDishes array of currentOrder
        const tobeAddedDishes = [...state.currentOrder.tobeAddedDishes, {
          dishId:dishId,
          numberOfCurDish:1
        }];
        
        // set updatedOrder with updated tobeAddedDishes
        const updatedOrder = {
          ...state.currentOrder,
          tobeAddedDishes,
        };

        state.currentOrder = updatedOrder;

        // find the current order in orders, which needs to be updated, in previous operations, id doesn't change.
        const orderIndex = state.orders.findIndex(order => order.id === state.currentOrder.id && order.tableNumber===curTable);
        // update order in orders
        state.orders=[
          ...state.orders.slice(0, orderIndex),
          updatedOrder,
          ...state.orders.slice(orderIndex+1)
        ];

        // console.log("State after creating order:", state.currentOrder);
      },
      removeDishFromShoppingCart:(state, action) => {
        const dishId = action.payload.dishId;
        const curTable = action.payload.currentTable;
        // console.log("dishId is", dishId);
        // console.log("curTable is", curTable);
        const { orders } = state;

        // find the current order in orders, which needs to be updated, in previous operations, id doesn't change.
        const orderIndex = orders.findIndex(order => order.id === state.currentOrder.id && order.tableNumber===curTable);
     
        // console.log(orderIndex);
        let tobeAddedDishes = [...state.currentOrder.tobeAddedDishes];

        const dishIndex = tobeAddedDishes.findIndex(dish => dish.dishId === dishId);

        if(dishIndex !== -1) {
          tobeAddedDishes.splice(dishIndex,1);
        }
        // console.log("toBeAddedDishes is", tobeAddedDishes);
        // create a new order object which is simliar to currentOrder except tobeAddedDishes
        const updatedOrder = {
          ...state.currentOrder, 
          tobeAddedDishes};

        state.currentOrder=updatedOrder;
        // console.log("updatedorder is",updatedOrder);


        //how to update orders?, the same
        state.orders=[
          ...state.orders.slice(0, orderIndex),
          updatedOrder,
          ...state.orders.slice(orderIndex+1)
        ];
        
        // console.log("State after creating order:", state.currentOrder);
      }
    }
  });

export const { createOrder, addDishToShoppingCart, removeDishFromShoppingCart } = ordersSlice.actions;
export const selectCurrentTable = (state) => state.allOrders.currentTable;
export const selectCurrentOrder = (state) => state.allOrders.currentOrder;



export default ordersSlice.reducer;