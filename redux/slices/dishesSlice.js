import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dishes: [],
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    addDishes: (state, action) => {
      state.dishes = action.payload;
    },
  },
});

export const { addDishes } = dishesSlice.actions;
export const selectDishes = (state) => state.dishes;

export default dishesSlice.reducer;
