import { createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";

const initialState = {
  allData: [],
  userSelected: "",
};

const adminSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllData: (state, action) => {
      state.allData = action.payload;
    },
    setUserSelected: (state, action) => {
      state.userSelected = action.payload;
    },
  },
});

export const { setAllData, setUserSelected } = adminSlice.actions;

export default adminSlice.reducer;
