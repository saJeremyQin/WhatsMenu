
import { createSlice } from "@reduxjs/toolkit";
import { selectDishById } from "./dishesSlice";

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
            // haveBeenPlacedDishes: [],
            ongoingDishesSections:[],
            orderStatus: 1,               //1, ongoing; 0, finished or unstart
          };

          state.currentOrderId=orderId;
          state.orders=[...state.orders,newOrder];
          // console.log("State after creating order:", state);
      },
      addDishToShoppingCart: (state, action) => {
        const { currentOrderId: orderId, currentTable } = state;
        const { dishId } = action.payload;

        const orderIndex = state.orders.findIndex((order) => order.id === orderId && order.tableNumber === currentTable);
        if (orderIndex === -1) return;

        let updatedOrder = null;
        const { tobeAddedDishes } = state.orders[orderIndex];
        const dishIndex = tobeAddedDishes.findIndex((dish) => dish.dishId === dishId);
        // console.log("tobeAdded is", tobeAddedDishes);
        // console.log("dish index is", dishIndex);

        if (dishIndex === -1) {
          // create a new array of tobeAddedDishes for the updated order, add a new object.
          const tobeAddedDishes = [...state.orders[orderIndex].tobeAddedDishes, {
            dishId:dishId,
            dishQuantity:1
          }];
        
          // create a new object representing the updated order.
          updatedOrder = {
            ...state.orders[orderIndex],
            tobeAddedDishes,
          };

          state.currentOrderId = orderId;
        } else {
          // How to complete the code?
          const tobeAddedDishes = state.orders[orderIndex].tobeAddedDishes;
          const dish = tobeAddedDishes[dishIndex];
          const curDishQuantity = dish.dishQuantity;
          const updatedDish = {
            ...dish,
            dishQuantity: curDishQuantity+1
          };
          const updatedToBeAddedDishes = [
            ...tobeAddedDishes.slice(0,dishIndex),
            updatedDish,
            ...tobeAddedDishes.slice(dishIndex+1)
          ];
          updatedOrder = {
            ...state.orders[orderIndex],
            tobeAddedDishes:updatedToBeAddedDishes,
          };
        }

        // update order in orders
        state.orders=[
          ...state.orders.slice(0, orderIndex),
          updatedOrder,
          ...state.orders.slice(orderIndex+1)
        ];
        // console.log("State after creating order:", state.orders[orderIndex]);
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
        // console.log("updatedTo is",updatedTobeAddedDishes);

        const updatedOrder = { ...state.orders[orderIndex], tobeAddedDishes: updatedTobeAddedDishes };

        state.orders = [
          ...state.orders.slice(0, orderIndex),
          updatedOrder,
          ...state.orders.slice(orderIndex + 1),
        ];
      },
      placeOrder:(state, action) => {
        const { currentOrderId: orderId, currentTable } = state;

        const orderIndex = state.orders.findIndex((order) => order.id === orderId && order.tableNumber === currentTable);
        if (orderIndex === -1) return;

        let { tobeAddedDishes } = state.orders[orderIndex];
        // console.log("tobeAddedDishes are",tobeAddedDishes);

        //add one section each time 
        const currentTime = new Date();
        const currentTimestamp = currentTime.getTime();

        const ongoingDishesSections = [...state.orders[orderIndex].ongoingDishesSections, {
          dishesOngoing: tobeAddedDishes,
          placedTime: currentTimestamp
        }];

        const updatedOrder = {
          ...state.orders[orderIndex],
          tobeAddedDishes: [],
          ongoingDishesSections
        };

        state.orders = [
          ...state.orders.slice(0, orderIndex),
          updatedOrder,
          ...state.orders.slice(orderIndex + 1),
        ];
        // console.log("updatedOrder after placeOrder is",updatedOrder);
      },
      deleteDishInOngoingDishes:(state,action) => {

        const { currentOrderId: orderId, currentTable } = state;
        const orderIndex = state.orders.findIndex((order) => order.id === orderId && order.tableNumber === currentTable);
        if (orderIndex === -1) return;

        const indexS=action.payload.indexS;
        const indexD=action.payload.indexD;
        console.log("indexS is", indexS);
        console.log("indexD is", indexD);

        let tempDishesArray = [...state.orders[orderIndex].ongoingDishesSections[indexS].dishesOngoing];
        console.log("tempDishesArray is", tempDishesArray);

        let updatedOngoingDishes=null;

        //check whether the dishquantity is 1 before update
        const curDishQuantity = tempDishesArray[indexD].dishQuantity;
        if( curDishQuantity > 1) {
          //delete dishQuantity to 1 first.
          const updatedDish = {
            ...tempDishesArray[indexD],
            dishQuantity:curDishQuantity-1
          };
          updatedOngoingDishes = [
            ...tempDishesArray.slice(0, indexD),
            updatedDish,
            ...tempDishesArray.slice(indexD+1)
          ];
        } else {
          //dishQuantity=1, delete current dish
          updatedOngoingDishes = [
            ...tempDishesArray.slice(0, indexD),
            ...tempDishesArray.slice(indexD + 1)
          ];
        }

        console.log("updatedOngoingDishes are", updatedOngoingDishes);

        //remove the dishesOngoing[indexD], but operate on copied data.
        //const updatedOngoingDishes = tempDishesArray.splice(indexD,1);
         
        //check whether the length is 0 after update.
        const curLength = updatedOngoingDishes.length;

        let updatedOrder = null;

        //if curLength=0, delete current section, or update dishesArray
        if(curLength == 0) {
          // delete the current section
          const updatedOngoingDishesSections = [      
            ...state.orders[orderIndex].ongoingDishesSections.slice(0, indexS),
            ...state.orders[orderIndex].ongoingDishesSections.slice(indexS + 1)
          ];

          updatedOrder = {
            ...state.orders[orderIndex],
            ongoingDishesSections: updatedOngoingDishesSections
          };        
        } else {
          //update specified section
          const updatedDishesSection = {
            ...state.orders[orderIndex].ongoingDishesSections[indexS],
            dishesOngoing: updatedOngoingDishes
          };

          //update sections
          const updatedOngoingDishesSections = [
            ...state.orders[orderIndex].ongoingDishesSections.slice(0,indexS),
            updatedDishesSection,
            ...state.orders[orderIndex].ongoingDishesSections.slice(indexS+1)
          ];
          updatedOrder = {
            ...state.orders[orderIndex],
            ongoingDishesSections: updatedOngoingDishesSections
          };   
        }
        // console.log("updatedOrder after delete is", updatedOrder);
        //how to update orders?, the same
        state.orders=[
          ...state.orders.slice(0, orderIndex),
          updatedOrder,
          ...state.orders.slice(orderIndex+1)
        ];
      },
      checkOutOrder: (state, action) => {
        const { currentOrderId, currentTable } = state;
        state.orders = state.orders.filter((order) => !(order.id === currentOrderId && order.tableNumber === currentTable));
        state.currentOrderId = null;
        state.currentTable = 0;
        console.log("orders are", state.orders);
      },
      resumeOrder: (state, action) => {
        state.currentTable = action.payload.tableNumber;
        const orderId = state.orders.find((order) => order.tableNumber === state.currentTable)?.id;
        console.log("orderId is", orderId);
        state.currentOrderId = orderId;
      }
    }
  });

export const { 
  createOrder, 
  addDishToShoppingCart, 
  removeDishFromShoppingCart,
  changeDishQuantityInShoppingCart,
  placeOrder,
  deleteDishInOngoingDishes,
  checkOutOrder,
  resumeOrder
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

export const selectOngoingDishesSections = (state) => 
  state.allOrders.orders.find((order) => order.id === state.allOrders.currentOrderId).ongoingDishesSections;


export const selectTotalAmountByTableNumber = (tableNumber) => (state) => {
  const orders = selectOrders(state);
  const tableOrder = orders.find((order) => order.tableNumber === tableNumber);

  let totalAmount = 0;
  if (tableOrder) {
    totalAmount = tableOrder.ongoingDishesSections.reduce(
      (acc, section) =>
        acc +
        section.dishesOngoing.reduce(
          (acc, dish) =>
            acc + selectDishById(dish.dishId)(state)?.price * dish.dishQuantity,
          0
        ),
      0
    );
  }

  return totalAmount;
};
  
export default ordersSlice.reducer;