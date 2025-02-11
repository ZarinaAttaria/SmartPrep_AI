const express = require("express");

const router = express.Router();
const questionsBankController = require("../controllers/questionsBankController");
router.post("/generate-questions", questionsBankController.generateQuestions);

module.exports = router;
