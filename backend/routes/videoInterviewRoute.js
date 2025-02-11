const express = require("express");
const {getQuestion,analyzeResponse,getInterviewFeedback}=require('../controllers/videoInterviewController')
const router=express.Router();
const multer = require('multer');
const upload = multer();

router.get('/get-question',getQuestion)
// router.post('/transcribe', upload.single('audio'), transcribeAudio);
router.post('/analyze-response', analyzeResponse)
router.get('/get-feedback', getInterviewFeedback)

module.exports=router;