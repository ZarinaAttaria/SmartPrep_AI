const mongoose = require("mongoose");
const interviewSetupSchema = new mongoose.Schema(
  {
    interviewType: {
      type: String,
      enum: ["Behavioural", "Technical", "CaseStudy"],
      required: true,
    },
    interviewDuration: {
      type: Number,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    interviewLevel: {
      type: String,
      enum: ["Junior", "Mid", "Senior"],
      required: true,
    },
  },
  { timestamps: true }
);
const InterviewSetup = mongoose.model("InterviewSetup", interviewSetupSchema);

module.exports = InterviewSetup;
