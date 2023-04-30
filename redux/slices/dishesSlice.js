import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dishes: [],
};

const dishesSlice = createSlice({
  name: 'allDishes',
  initialState,
  reducers: {
    setDishes: (state, action) => {
      console.log("payload is", action.payload);
      state.dishes = action.payload;
    }
  },
});

export const { setDishes } = dishesSlice.actions;
export const selectDishes = (state) => state.allDishes.dishes;
export const selectDishById = (dishId) => (state) => {
  // This will create a closure that captures the dishId argument, 
  // and returns a selector function that takes the state and returns the desired dish object.
  const {dishes} = state.allDishes;
  return dishes.find((dish) => dish.id === dishId);
};

export const selectDishesByType = (type) => (state) => {
  const {dishes} = state.allDishes;
  return dishes.filter((dish) => dish.type === type);
};

export default dishesSlice.reducer;
