const express = require("express");
const interviewController = require("../controllers/interviewController");
const router = express.Router();

router.post("/generate-question", interviewController.generateInitialQuestion);
router.post(
  "/generate-follow-up",
  interviewController.generateFollowUpQuestion
);
router.post("/analyze-text-response", interviewController.analyzeTextResponse);
router.post(
  "/generate-detailed-feedback",
  interviewController.generateDetailedFeedback
);
router.post(
  "/generate-sample-answer",
  interviewController.generateSampleAnswer
);
module.exports = router;
