import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userName: "",
  password: "",
  email: "",
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
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});
export const { setUserName, setPassword, setEmail } = authSlice.actions;
export default authSlice.reducer;
