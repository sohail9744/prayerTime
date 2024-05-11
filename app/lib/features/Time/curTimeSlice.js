import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: "",
};

export const curntTime = createSlice({
  name: "currentTime",
  initialState,
  reducers: {
    add: (state, action) => {
      //actinon.payload => the item is coming from frontend using useDispatch()
      // state.items => your intialState were you are storing the items
      state.time = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add } = curntTime.actions;
export default curntTime.reducer;
