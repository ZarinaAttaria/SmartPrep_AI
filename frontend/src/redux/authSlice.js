import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userName: "",
  password: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});
export const { setUserName, setPassword } = authSlice.actions;
export default authSlice.reducer;
