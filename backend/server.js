const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const connectDb = require("./config/connectDb");
const userRoutes = require("./routes/userRoute");
const interviewRoutes = require("./routes/interviewRoutes");
const questionBankRoutes = require("./routes/questionBankRoutes");
const videoRoutes = require("./routes/videoInterviewRoute");

app.use(express.json());
app.use(cors());

connectDb();
app.use("/users", userRoutes);
app.use("/interview", interviewRoutes);
app.use("/questionBank", questionBankRoutes);
app.use("/videoInterview", videoRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
