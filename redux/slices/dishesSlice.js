import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dishes: [],
};

const dishesSlice = createSlice({
  name: 'allDishes',
  initialState,
  reducers: {
    addDishes: (state, action) => {
      state.dishes = action.payload;
      // console.log("dishes after add are", state.dishes);
    },

  },
});

export const { addDishes } = dishesSlice.actions;
export const selectDishes = (state) => state.allDishes.dishes;
// export const selectDishById = (state, dishId) => {
//   console.log("current state is", state);
//   state.allDishes.dishes.find((dish) => dish.id === dishId);
// }
export const selectDishByIdWrapper = (dishId) => (state) => {
  // This will create a closure that captures the dishId argument, 
  // and returns a selector function that takes the state and returns the desired dish object.
  return state.allDishes.dishes.find((dish) => dish.id === dishId);
}

export const selectDishesByTypeWrapper = (type) => (state) => {
  return state.allDishes.dishes.filter((dish) => dish.type === type);
}


export default dishesSlice.reducer;
