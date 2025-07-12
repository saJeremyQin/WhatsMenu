import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { request} from 'graphql-request';
import { DISHES_QUERY } from '../../globals/netRequest';

const initialState = {
  dishes: [],
  loading: false,
  error: null,
};

export const fetchDishes = createAsyncThunk(
  'dishes/fetchDishes',                    //Action type prefix
  async (_, thunkAPI) => {                 //payloadCreator function
    try {
      const endpoint = "https://whats-menu-server.vercel.app/api";
      const data = await request(endpoint, DISHES_QUERY);
      return data.dishes;
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to get dishes')
    }
  }

)

const dishesSlice = createSlice({
  name: 'allDishes',
  initialState,
  reducers: {
    // setDishes reducer is not necessary after using createAsyncThunk
    // setDishes: (state, action) => {
    //   // console.log("payload is", action.payload);
    //   state.dishes = action.payload;
    // }
  },
  // use extraReducers deal with createAsyncThunk lifecycle action
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {                  //pending, start request
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {        //fulfilled, success
        state.loading = false;
        state.dishes = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {         //rejected, request failure
        state.loading = false;
        state.error = action.payload;
        state.dishes = [];
      })

  }
});

// export const { setDishes } = dishesSlice.actions;
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
    (dishes) => dishes.filter(dish => dish.dishType.title === type)
  )

export default dishesSlice.reducer;
