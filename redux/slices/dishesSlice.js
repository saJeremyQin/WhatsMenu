import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  dishes: [],
};

const dishesSlice = createSlice({
  name: 'allDishes',
  initialState,
  reducers: {
    setDishes: (state, action) => {
      // console.log("payload is", action.payload);
      state.dishes = action.payload;
    }
  },
});

export const { setDishes } = dishesSlice.actions;
export const selectDishes = (state) => state.allDishes.dishes;

// export const selectDishById = (dishId) => (state) => {
//   // This will create a closure that captures the dishId argument, 
//   // and returns a selector function that takes the state and returns the desired dish object.
//   const {dishes} = state.allDishes;
//   return dishes.find((dish) => dish.id === dishId);
// };

// 通过dishId查找单个菜品，记得把dishId作为参数传进来
export const selectDishById = (dishId) => 
  createSelector(
    [selectDishes],
    (dishes) => dishes.find(dish => dish.id ===dishId)
  );


// export const selectDishesByType = (type) => (state) => {
//   const {dishes} = state.allDishes;
//   return dishes.filter((dish) => dish.type === type);
// };
export const selectDishesByType = (type) => 
  createSelector(
    [selectDishes],
    (dishes) => dishes.filter(dish => dish.type.title === type)
  )

export default dishesSlice.reducer;
