
import { createSelector, createSlice } from "@reduxjs/toolkit";
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
        // Since redux-toolkit has integrated immer, code can be written like state is mutable.
        const orderId = generateOrderId();
        const newOrder = {
          id: orderId,
          tableNumber:action.payload.tableNumber,
          numberOfDiners:action.payload.numberOfDiners,
          shoppingCartDishes: [],
          ongoingDishesSections:[],
          orderStatus: 1,               //1, ongoing; 0, finished or unstart
        };
        state.currentOrderId=orderId;
        state.currentTable=action.payload.tableNumber;
        state.orders.push(newOrder);
      },
      addDishToShoppingCart: (state, action) => {
        const { currentOrderId: orderId, currentTable } = state;
        const { dishId } = action.payload;
        const orderIndex = state.orders.findIndex((order) => order.id === orderId && order.tableNumber === currentTable);
        
        if (orderIndex === -1) {
            return;
        }

        const order = state.orders[orderIndex];
        const dishIndex = order.shoppingCartDishes.findIndex((dish) => dish.dishId === dishId);

        // if dish doesn't exists in shoppingCartDishes, push a new one
        if (dishIndex === -1) {
            order.shoppingCartDishes.push({ dishId, dishQuantity: 1 });
        } else {  // else, increment the quantity
            order.shoppingCartDishes[dishIndex].dishQuantity += 1;
        }
      },
      removeDishFromShoppingCart: (state, action) => {
        const { currentOrderId: orderId, currentTable } = state;
        const { dishId } = action.payload;
      
        const orderIndex = state.orders.findIndex((order) => order.id === orderId && order.tableNumber === currentTable);
        if (orderIndex === -1) return;
      
        const order = state.orders[orderIndex];
        const dishIndex = order.shoppingCartDishes.findIndex((dish) => dish.dishId === dishId);
        if (dishIndex === -1) return;
        
        //from the dishIndex, remove one, modify the original array.
        order.shoppingCartDishes.splice(dishIndex, 1);
      }, 
      changeDishQuantityInShoppingCart: (state, action) => {
        const { currentOrderId: orderId, currentTable } = state;
        const { dishId, slug } = action.payload;
      
        const orderIndex = state.orders.findIndex((order) => order.id === orderId && order.tableNumber === currentTable);
        if (orderIndex === -1) return;
      
        const order = state.orders[orderIndex];
        const dishIndex = order.shoppingCartDishes.findIndex((dish) => dish.dishId === dishId);
        if (dishIndex === -1) return;
      
        const quantity = slug === "plus" ? 1 : -1;
        order.shoppingCartDishes[dishIndex].dishQuantity += quantity;
      },    
      placeOrder:(state, action) => {
        const { currentOrderId: orderId, currentTable } = state;
      
        const orderIndex = state.orders.findIndex((order) => order.id === orderId && order.tableNumber === currentTable);
        if (orderIndex === -1) return;
      
        let shoppingCartDishes = state.orders[orderIndex].shoppingCartDishes;
      
        //add one section each time 
        const currentTime = new Date();
        const currentTimestamp = currentTime.getTime();
        
        //empty shoppingCartDishes, and create one section with time
        state.orders[orderIndex].shoppingCartDishes = [];
        state.orders[orderIndex].ongoingDishesSections.push({
          dishesOngoing: shoppingCartDishes,
          placedTime: currentTimestamp
        });     
      },   
      deleteDishInOngoingDishes: (state, action) => {
        const { currentOrderId: orderId, currentTable } = state;
        const orderIndex = state.orders.findIndex((order) => order.id === orderId && order.tableNumber === currentTable);
        if (orderIndex === -1) return;
      
        const indexS = action.payload.indexS;
        const indexD = action.payload.indexD;
      
        // locate to the indexS section
        const dishesOngoing = state.orders[orderIndex].ongoingDishesSections[indexS].dishesOngoing;
        
        // check whether the dish quantity of indexD dish is great than 1,
        // if yes, delete the dish quantity, if no, delete the dish in disheOngoing
        // after delete dish, check whehter the ongoingDishesSection length, if is 0, it has been empty, delete the section.
        const dishQuantity = dishesOngoing[indexD].dishQuantity;

        if(dishQuantity > 1) {
          //delete dish quantity
          state.orders[orderIndex].ongoingDishesSections[indexS].dishesOngoing[indexD].dishQuantity=dishQuantity-1;
        } else {
          //delete current dish
          state.orders[orderIndex].ongoingDishesSections[indexS].dishesOngoing.splice(indexD,1);
          //check whether the whole dishesOngoing is empty after delete dish
          const curLength = state.orders[orderIndex].ongoingDishesSections[indexS].dishesOngoing.length;
          if(curLength === 0) {
             // delete the current section
             state.orders[orderIndex].ongoingDishesSections.splice(indexS, 1);
          }   
        }    
      },
      checkOutOrder: (state, action) => {
        const { currentOrderId:orderId, currentTable } = state;
        const orderIndex = state.orders.findIndex((order) => order.id === orderId && order.tableNumber === currentTable);
        if (orderIndex === -1) return;
        state.orders.splice(orderIndex,1);
        // state.orders.filter((order) => !(order.id === currentOrderId && order.tableNumber === currentTable));

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
export const selectOrders = (state) => state.allOrders.orders;
export const selectCurrentOrderId = (state) => state.allOrders.currentOrderId;

// export const selectCurrentOrder = (state) =>  
//   state.allOrders.orders.find((order) => order.id === state.allOrders.currentOrderId);
export const selectCurrentOrder =createSelector(
  [selectOrders, selectCurrentOrderId],
  (orders, currentOrderId) => orders.find(order => order.id === currentOrderId)
);

export const selectNumberOfDiners = (state) => {
  const order = state.allOrders.orders.find((order) => order.id === state.allOrders.currentOrderId).numberOfDiners;
  return order ? order.numberOfDiners : 0; 
}

// export const selectDishQuantityByIdWrapper = (dishId) => (state) => {
//   // This will create a closure that captures the dishId argument, 
//   // and returns a selector function that takes the state and returns the desired dish object.
//   // return state.allDishes.dishes.find((dish) => dish.id === dishId);
//   // const { currentOrderId: orderId, currentTable } = state;
//   const orderId = state.allOrders.currentOrderId;
//   const curTable = state.allOrders.currentTable;
//   // console.log("current OrderId  is", orderId);
//   // console.log("curTable is", curTable);

//   const orderIndex = state.allOrders.orders.findIndex((order) => order.id === orderId && order.tableNumber === curTable);

//   if (orderIndex === -1) return;

//   const { shoppingCartDishes } = state.allOrders.orders[orderIndex];
//   const dishIndex = shoppingCartDishes.findIndex((dish) => dish.dishId === dishId);
//   if (dishIndex === -1) return;
//   return shoppingCartDishes[dishIndex].dishQuantity;
// }

// 类似地，针对某个dishId，获取当前订单中数量
export const selectDishQuantityByIdWrapper = (dishId) => createSelector(
  [selectOrders, selectCurrentOrderId, selectCurrentTable],
  (orders, currentOrderId, currentTable) => {
    const order = orders.find(order => order.id === currentOrderId && order.tableNumber === currentTable);
    if (!order) return undefined;
    const dish = order.shoppingCartDishes.find(d => d.dishId === dishId);
    return dish ? dish.dishQuantity : undefined;
  }
);

// export const selectOngoingDishesSections = (state) => 
//   state.allOrders.orders.find((order) => order.id === state.allOrders.currentOrderId).ongoingDishesSections;
export const selectOngoingDishesSections = (state) => {
  const order = state.allOrders.orders.find(order => order.id === state.allOrders.currentOrderId);
  return order ? order.ongoingDishesSections : [];
}

// export const selectTotalAmountByTableNumber = (tableNumber) => (state) => {
//   const orders = selectOrders(state);
//   const tableOrder = orders.find((order) => order.tableNumber === tableNumber);

//   let totalAmount = 0;
//   if (tableOrder) {
//     totalAmount = tableOrder.ongoingDishesSections.reduce(
//       (acc, section) =>
//         acc +
//         section.dishesOngoing.reduce(
//           (acc, dish) =>
//             acc + selectDishById(dish.dishId)(state)?.price * dish.dishQuantity,
//           0
//         ),
//       0
//     );
//   }

//   return totalAmount;
// };
export const selectTotalAmountByTableNumber = (tableNumber) => (state) => {
  const orders = selectOrders(state);
  const tableOrder = orders.find((order) => order.tableNumber === tableNumber);

  let totalAmount = 0;
  if (tableOrder && Array.isArray(tableOrder.ongoingDishesSections)) {
    totalAmount = tableOrder.ongoingDishesSections.reduce((acc, section) => {
      const dishes = Array.isArray(section.dishesOngoing) ? section.dishesOngoing : [];
      return acc + dishes.reduce((acc2, dish) => {
        const dishPrice = selectDishById(dish.dishId)(state)?.price || 0;
        return acc2 + dishPrice * dish.dishQuantity;
      }, 0);
    }, 0);
  }

  return totalAmount;
};

  
export default ordersSlice.reducer;