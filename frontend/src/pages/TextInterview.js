import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAnalysis,
  setCurrentQuestion,
  setResponses,
  setUserResponse,
} from "../redux/interviewSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "../styles/TextInterview.css";
const TextInterview = () => {
  const currentQuestion = useSelector(
    (state) => state.interview.currentQuestion
  );
  const userResponse = useSelector((state) => state.interview.userResponse);
  const responses = useSelector((state) => state.interview.responses);
  const analysis = useSelector((state) => state.interview.analysis);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [detailedFeedback, setDetailedFeedback] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showRecording, setShowRecording] = useState(false);
  const [sampleAnswer, setSampleAnswer] = useState(null);
  const [allResponses, setAllResponses] = useState([]);
  const interviewDuration = 2 * 60;

  const [timeLeft, setTimeLeft] = useState(interviewDuration);
  const maxQuestions = 5;

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      toast.error("Speech Recognition API not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Recognized Speech:", transcript);
      dispatch(setUserResponse(transcript));
      setIsRecording(false);
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      toast.error("Speech Recognition Error: " + event.error);
      setIsRecording(false);
    };

    recognitionInstance.onend = () => {
      setIsRecording(false);
    };

    setRecognition(recognitionInstance);
  }, [dispatch]);

  const toggleRecording = () => {
    if (recognition) {
      if (isRecording) {
        recognition.stop();
        console.log("Stopping Speech Recognition...");
      } else {
        recognition.start();
        console.log("Starting Speech Recognition...");
      }
      setIsRecording(!isRecording);
    }
  };

  const speakQuestion = () => {
    if (!currentQuestion) return;

    const speechSynthesis = window.speechSynthesis;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentQuestion);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.onend = () => setIsSpeaking(false);

    setIsSpeaking(true);
    speechSynthesis.speak(utterance);
  };
  useEffect(() => {
    if (timeLeft <= 0) {
      handleInterviewEnd();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const generateDetailedFeedback = async () => {
    if (!allResponses || allResponses.length === 0) {
      setDetailedFeedback(
        "No responses were recorded. Try answering at least one question to receive feedback."
      );
      return;
    }

    console.log("Sending responses for feedback:", allResponses);

    try {
      const response = await axios.post(
        "http://localhost:8000/interview/generate-detailed-feedback",
        { responses: allResponses }
      );
      setDetailedFeedback(response.data.feedback);
    } catch (error) {
      console.error("Error generating feedback:", error);
      toast.error("Error generating feedback. Please try again.");
    }

    dispatch(setCurrentQuestion(null));
  };

  const handleInterviewEnd = async () => {
    toast.info("Time's up! Submitting the interview...");
    await generateDetailedFeedback();
  };

  const handleResponse = (e) => {
    dispatch(setUserResponse(e.target.value));
  };

  useEffect(() => {
    const fetchInitialQuestion = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/interview/generate-question",
          { JobDescription: "Software engineer skilled in React and Node.js" }
        );
        dispatch(setCurrentQuestion(response.data.question));
      } catch (error) {
        console.error("Error in fetching question", error);
        toast.error("Failed to load initial question.");
      }
    };

    fetchInitialQuestion();
  }, [dispatch]);

  const analyzeTextResponse = async () => {
    try {
      console.log("Sending request to analyze text:", userResponse);
      const response = await axios.post(
        "http://localhost:8000/interview/analyze-text-response",
        {
          text: userResponse,
          question: currentQuestion,
        }
      );
      console.log("Response from backend:", response.data);
      dispatch(setAnalysis(response.data));
    } catch (error) {
      console.error(
        "Error analyzing text response:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  const generateSampleAnswer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/interview/generate-sample-answer",
        { text: userResponse, currentQuestion }
      );
      console.log("sample answer", response.data);
      setSampleAnswer(response.data);
    } catch (error) {
      console.error(
        "Error analyzing text response:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };
  const handleResponseSubmit = async () => {
    if (!userResponse.trim()) {
      toast.error("Please provide a response before proceeding.");
      return;
    }

    setLoading(true);
    const newResponses = [
      ...responses,
      { question: currentQuestion, response: userResponse },
    ];
    setAllResponses(newResponses);

    try {
      if (timeLeft <= 0) {
        generateDetailedFeedback();
      } else {
        await analyzeTextResponse();
        await generateSampleAnswer();
        const response = await axios.post(
          "http://localhost:8000/interview/generate-follow-up",
          { previousResponse: userResponse, responses: newResponses }
        );

        dispatch(setCurrentQuestion(response.data.nextQuestion));
        setQuestionCount((prev) => prev + 1);
      }

      dispatch(setResponses(newResponses));
      dispatch(setUserResponse(""));
    } catch (error) {
      console.error("Error generating follow-up question:", error);
      toast.error("Failed to load next question.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ToastContainer />

      <div className="text-interview-container">
        <h2 className="text-interview-title">Text-based Interview</h2>
        <div style={{ color: "black" }}>
          TimeLeft: <strong>{formatTime(timeLeft)}</strong>
        </div>
        {currentQuestion ? (
          <div className="text-interview-question-section">
            <h3 className="text-interview-question-title">
              Question {questionCount + 1}{" "}
            </h3>
            <p className="text-interview-question-text">{currentQuestion}</p>
            <button
              onClick={speakQuestion}
              className="text-interview-speak-button"
            >
              {isSpeaking ? "🛑 Stop Speaking" : "🔊 Read Question"}
            </button>
            {!showRecording && (
              <div>
                <input
                  type="text"
                  value={userResponse}
                  placeholder="Type or speak your response..."
                  onChange={handleResponse}
                  className="text-interview-input"
                />
              </div>
            )}

            <div className="text-interview-recording-section">
              <a
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setShowRecording((prev) => !prev)}
              >
                {!showRecording
                  ? "Or speak your response"
                  : "Or type your response"}
              </a>
              {showRecording && (
                <button
                  className={`mic-button ${isRecording ? "recording" : ""}`}
                  onClick={toggleRecording}
                >
                  {isRecording ? "🛑 Stop" : "🎤 Speak"}
                  <p>{userResponse}</p>
                </button>
              )}
            </div>
            <button
              onClick={handleResponseSubmit}
              disabled={loading}
              className="text-interview-submit-button"
            >
              {loading ? "Submitting..." : "Submit Response"}
            </button>
            {analysis ? (
              <div className="text-interview-analysis-section">
                <h3 className="text-interview-analysis-title">Feedback:</h3>
                <div className="text-interview-analysis-text">{analysis}</div>
                <h3 className="text-interview-analysis-title">
                  Sample Answer:
                </h3>
                <div className="text-interview-analysis-text">
                  {sampleAnswer}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="text-interview-thank-you-section">
            <h2 className="text-interview-thank-you-title">Thank you!</h2>
            <p className="text-interview-thank-you-text">
              Your interview has been recorded.
            </p>
            {detailedFeedback && (
              <div className="text-interview-feedback-section">
                <h3 className="text-interview-feedback-title">
                  Detailed Feedback:
                </h3>
                <p className="text-interview-feedback-text">
                  {detailedFeedback}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TextInterview;
