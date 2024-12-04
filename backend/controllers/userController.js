const User = require("../models/userModel");
const InterviewSetup = require("../models/interviewSetupModel");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokenUtils");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  try {
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    user = await user.save();
    res.status(201).json({ message: "User created Successfully." });
  } catch (error) {
    console.log("Signup Error.", error);
    res
      .status(500)
      .json({ message: "Error in Creating User", error: error.message });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    res.json({ user, refresh: refreshToken, accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
}
async function refreshToken(req, res) {
  try {
    if (!req.body.refreshToken) {
      return res.status(401).json({ message: "Refresh Token is required" });
    }
    const user = jwt.verify(
      req.body.refreshToken,
      process.env.JWT_REFRESH_SECRET
    );
    const accessToken = generateAccessToken(user.userId);
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({
      message: "Invalid or expired refresh token",
      error: error.message,
    });
  }
}
async function interviewSetup(req, res) {
  try {
    const { interviewType, interviewDuration, jobDescription, interviewLevel } =
      req.body;

    const newInterviewSetup = new InterviewSetup({
      interviewType,
      interviewDuration,
      jobDescription,
      interviewLevel,
    });

    await newInterviewSetup.save();

    res.status(200).json({
      message: "Interview setup data saved successfully!",
      data: newInterviewSetup,
    });
  } catch (error) {
    console.error("Error saving interview setup:", error);
    res
      .status(500)
      .json({ message: "Error saving interview setup", error: error.message });
  }
}
module.exports = {
  signup,
  login,
  refreshToken,
  interviewSetup,
};
