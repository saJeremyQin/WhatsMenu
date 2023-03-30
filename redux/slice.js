
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
          console.log("State after creating order:", state);
      },
    }
  });

export const { createOrder } = ordersSlice.actions;
export const selectCurrentTable = (state) => state.allOrders.currentTable;



export default ordersSlice.reducer;