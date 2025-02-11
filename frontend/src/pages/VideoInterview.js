
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";

// const VideoInterview = () => {
//   const [stream, setStream] = useState(null);
//   const [question, setQuestion] = useState("");
//   const [responseFeedback, setResponseFeedback] = useState("");
//   const [isInterviewStarted, setIsInterviewStarted] = useState(false);
//   const [isSpeechRecognitionAvailable, setIsSpeechRecognitionAvailable] = useState(false);
//   const videoRef = useRef(null);

//   // Check if SpeechRecognition is available
//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     setIsSpeechRecognitionAvailable(!!SpeechRecognition);
//   }, []);

//   // Set up video stream
//   useEffect(() => {
//     const startVideoStream = async () => {
//       try {
//         const mediaStream = await navigator.mediaDevices.getUserMedia({
//           video: { width: 640, height: 480, frameRate: 30 },
//           audio: true,
//         });
//         setStream(mediaStream);
//         if (videoRef.current) videoRef.current.srcObject = mediaStream;
//       } catch (error) {
//         console.error("Error starting video stream:", error);
//       }
//     };

//     startVideoStream();

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);
//   useEffect(() => {
//     testMicrophone();
//   }, []);

//   // Speak text using Text-to-Speech
//   const speakText = (text) => {
//     const speech = new SpeechSynthesisUtterance(text);
//     speech.lang = "en-US";
//     speech.pitch = 1;
//     speech.rate = 1;
//     speechSynthesis.speak(speech);
//   };

//   // Start the interview
//   const startInterview = async () => {
//     setIsInterviewStarted(true);
//     await fetchAndAskQuestion();
//   };

//   // Fetch the next question and speak it
//   const fetchAndAskQuestion = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:8000/videoInterview/get-question", {
//         params: {
//           previousQuestion: question || null,
//           jobDescription: "Software Engineer",
//           difficulty: "medium",
//           duration: "1 minute",
//         },
//       });
//       console.log("Question for interview:", data.question);
//       setQuestion(data.question);
//       speakText(data.question);
//     } catch (error) {
//       console.error("Error fetching question:", error);
//     }
//   };

//   const testMicrophone = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       console.log("Microphone access successful!");
//       mediaStream.getTracks().forEach(track => track.stop());
//     } catch (error) {
//       console.error("Microphone access error:", error);
//     }
//   };

//   // Use SpeechRecognition to transcribe user response
//   const startSpeechRecognition = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       console.error("SpeechRecognition is not supported in this browser.");
//       alert("Speech recognition is not supported in your browser. Please try Chrome or Edge.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     // recognition.continuous = false;
//     recognition.continuous = true; // Allow continuous recognition
// recognition.interimResults = true; 

//     recognition.onstart = () => {
//       console.log("Speech recognition started.");
//     };

//     recognition.onresult = (event) => {
//       const transcript = Array.from(event.results)
//         .map(result => result[0].transcript)
//         .join("");
//       console.log("Transcript:", transcript);
//       if (!transcript.trim()) {
//         console.warn("No speech detected. Please speak louder or move closer to the microphone.");
//       } else {
//         analyzeResponse(transcript);
//       }
//     };

//     recognition.onerror = (event) => {
//       if (event.error === "no-speech") {
//         console.warn("No speech detected. Retrying...");
//       } else {
//         console.error("Speech recognition error:", event.error);
//       }
//     };
//     recognition.onend = () => {
//       console.log("Speech recognition ended.");
//     };

//     recognition.start();
//   };


//   const analyzeResponse = async (userResponse) => {
//     try {
//       const { data } = await axios.post("http://localhost:8000/videoInterview/analyze-response", {
//         response: userResponse,
//         previousQuestion: question,
//       });
//       setResponseFeedback(data.feedback);
//       await fetchAndAskQuestion();
//     } catch (error) {
//       console.error("Error analyzing response:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Video Interview</h1>
//       <div>
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           playsInline
//           style={{ width: "640px", height: "480px", border: "1px solid black" }}
//         />
//       </div>
//       <div>
//         {!isInterviewStarted ? (
//           <button onClick={startInterview}>Start Interview</button>
//         ) : isSpeechRecognitionAvailable ? (
//           <button onClick={startSpeechRecognition}>Record Response</button>
//         ) : (
//           <div>
//             <input
//               type="text"
//               placeholder="Type your response here"
//               onBlur={(e) => analyzeResponse(e.target.value)}
//               style={{ width: "400px", padding: "8px", margin: "8px 0" }}
//             />
//             <p>
//               Speech recognition is unavailable. Please type your response and press Enter.
//             </p>
//           </div>
//         )}
//       </div>
//       <div>
//         <h3>Question: {question}</h3>
//         <h4>Feedback: {responseFeedback}</h4>
//       </div>
//     </div>
//   );
// };

// export default VideoInterview;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const VideoInterview = () => {
  const [stream, setStream] = useState(null);
  const [question, setQuestion] = useState("");
  const [responseFeedback, setResponseFeedback] = useState("");
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isSpeechRecognitionAvailable, setIsSpeechRecognitionAvailable] = useState(false);
  const videoRef = useRef(null);

  // Check if SpeechRecognition is available
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSpeechRecognitionAvailable(!!SpeechRecognition);
  }, []);

  // Set up video stream
  useEffect(() => {
    const startVideoStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, frameRate: 30 },
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      } catch (error) {
        console.error("Error starting video stream:", error);
      }
    };

    startVideoStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // Test microphone permissions
  useEffect(() => {
    const testMicrophone = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Microphone access successful!");
        mediaStream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        console.error("Microphone access error:", error);
      }
    };

    testMicrophone();
  }, []);

  // Speak text using Text-to-Speech
  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.pitch = 1;
    speech.rate = 1;
    speechSynthesis.speak(speech);
  };

  // Start the interview
  const startInterview = async () => {
    setIsInterviewStarted(true);
    await fetchAndAskQuestion();
  };

  // Fetch the next question and speak it
  const fetchAndAskQuestion = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/videoInterview/get-question", {
        params: {
          previousQuestion: question || null,
          jobDescription: "Software Engineer",
          difficulty: "medium",
          duration: "1 minute",
        },
      });
      console.log("Question for interview:", data.question);
      setQuestion(data.question);
      speakText(data.question);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  // Start SpeechRecognition and handle response
  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser. Please try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true; // Allow continuous recognition
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log("Speech recognition started.");
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      console.log("Transcript:", transcript);

      if (event.results[event.results.length - 1].isFinal) {
        console.log("Final transcript received:", transcript);
        analyzeResponse(transcript); // Call the backend for analysis
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") {
        console.warn("No speech detected. Retrying...");
      } else {
        console.error("Speech recognition error:", event.error);
      }
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
    };

    recognition.start();
  };

  // Analyze user response
  const analyzeResponse = async (userResponse) => {
    try {
      const { data } = await axios.post("http://localhost:8000/videoInterview/analyze-response", {
        response: userResponse,
        previousQuestion: question,
      });
      setResponseFeedback(data.feedback);
      await fetchAndAskQuestion();
    } catch (error) {
      console.error("Error analyzing response:", error);
    }
  };

  return (
    <div>
      <h1>Video Interview</h1>
      <div>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ width: "640px", height: "480px", border: "1px solid black" }}
        />
      </div>
      <div>
        {!isInterviewStarted ? (
          <button onClick={startInterview}>Start Interview</button>
        ) : isSpeechRecognitionAvailable ? (
          <button onClick={startSpeechRecognition}>Record Response</button>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Type your response here"
              onBlur={(e) => analyzeResponse(e.target.value)}
              style={{ width: "400px", padding: "8px", margin: "8px 0" }}
            />
            <p>
              Speech recognition is unavailable. Please type your response and press Enter.
            </p>
          </div>
        )}
      </div>
      <div>
        <h3>Question: {question}</h3>
        <h4>Feedback: {responseFeedback}</h4>
      </div>
    </div>
  );
};

export default VideoInterview;
