import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentQuestion: " ",
  userResponse: "",
  responses: "",
  analysis:null,
};
const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setUserResponse: (state, action) => {
      state.userResponse = action.payload;
    },
    setResponses: (state, action) => {
      state.responses = action.payload;
    },
    setAnalysis: (state, action) => {
      state.analysis=action.payload
    }
  },
});
export const { setCurrentQuestion, setUserResponse, setResponses ,setAnalysis} =
  interviewSlice.actions;
export default interviewSlice.reducer;
