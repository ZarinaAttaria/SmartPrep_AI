// const openRouter = require('../config/openRouterConfig');

// async function getQuestion(req, res) {
//     try {
//         const { jobDescription, difficulty, duration, previousQuestion } = req.query;

//         if (!jobDescription || !difficulty || !duration) {
//             return res.status(400).json({ error: 'Missing required parameters: jobDescription, difficulty, or duration' });
//         }

//         const prompt = previousQuestion
//             ? `Based on this response, generate the next logical interview question: ${previousQuestion}`
//             : `Generate the first interview question for ${jobDescription} position. Its difficulty should be ${difficulty}. The question should be short, and if it's the first question, ask about their introduction. Ask like a human and dont give any heading.`;

//         const response = await openRouter.post('/chat/completions', {
//             model: 'sophosympatheia/rogue-rose-103b-v0.2:free',
//             messages: [
//                 { role: 'system', content: 'You are an expert in generating interview questions.' },
//                 { role: 'user', content: prompt },
//             ],
//             max_tokens: 150,
//         });
//         console.log("OpenAI response:", response.data);

//         const question = response.data.choices[0].message.content.trim();
//         res.status(200).json({ question });
//     } catch (error) {
//         console.error('Error:',error.message);
//         res.status(500).json({
//             error: error.response?.data?.error?.message || 'An error occurred while generating the question.',
//         });
//     }
// }

// async function analyzeResponse(req, res) {
//     try {
//         const { response, previousQuestion } = req.body;

//         const feedbackPrompt = `Evaluate this response: "${response}" for the question "${previousQuestion}". Provide constructive feedback.`;

//         const feedbackResponse = await openRouter.post('/chat/completions', {
//             model: 'sophosympatheia/rogue-rose-103b-v0.2:free',
//             messages: [
//                 { role: 'system', content: 'You are a professional interviewer analyzing candidate responses.' },
//                 { role: 'user', content: feedbackPrompt },
//             ],
//             max_tokens: 100,
//         });

//         const feedback = feedbackResponse.data.choices[0].message.content.trim();
//         res.status(200).json({ feedback });
//     } catch (error) {
//         console.error('Error analyzing response:', error);
//         res.status(500).json({ error: 'Failed to analyze response' });
//     }
// }

// module.exports = {
//     getQuestion,
//     analyzeResponse,
// };

const openRouter = require("../config/openRouterConfig");

let interviewFeedback = []; // Store feedback for entire interview

async function getQuestion(req, res) {
  try {
    const { jobDescription, difficulty, previousQuestion } = req.query;

    if (!jobDescription || !difficulty) {
      return res.status(400).json({
        error: "Missing required parameters: jobDescription or difficulty",
      });
    }

    const isFirstQuestion = !previousQuestion || previousQuestion.trim() === "";
    const prompt = isFirstQuestion
      ? `For a ${jobDescription} position, ask the first question which is always an introduction, e.g., "Please introduce yourself."Keep the question short and ask question in a human way `
      : `Based on the response to "${previousQuestion}", generate the next logical question in a human way and ask only question. Ensure it tests relevant skills or knowledge for the ${jobDescription} position with ${difficulty} difficulty. Keep it short up to 1 line.`;

    const response = await openRouter.post("/chat/completions", {
      model: "sophosympatheia/rogue-rose-103b-v0.2:free",
      messages: [
        {
          role: "system",
          content: "You are an expert in generating interview questions.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    });

    const question = response.data.choices[0].message.content.trim();
    res.status(200).json({ question });
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error:
        error.response?.data?.error?.message ||
        "An error occurred while generating the question.",
    });
  }
}

async function analyzeResponse(req, res) {
  try {
    const { response, previousQuestion } = req.body;

    const feedbackPrompt = `Evaluate this response: "${response}" for the question "${previousQuestion}". Provide short and concide general feedback ina human way and dont write anything like, sure here is feedback or for the response xyz feedback is here.`;
    const feedbackResponse = await openRouter.post("/chat/completions", {
      model: "sophosympatheia/rogue-rose-103b-v0.2:free",
      messages: [
        {
          role: "system",
          content:
            "You are a professional interviewer analyzing candidate responses in human way.",
        },
        { role: "user", content: feedbackPrompt },
      ],
      max_tokens: 200,
    });

    const feedback = feedbackResponse.data.choices[0].message.content.trim();
    interviewFeedback.push({ question: previousQuestion, response, feedback });
    res.status(200).json({ feedback });
  } catch (error) {
    console.error("Error analyzing response:", error);
    res.status(500).json({ error: "Failed to analyze response" });
  }
}

async function getInterviewFeedback(req, res) {
  try {
    res.status(200).json({ feedback: interviewFeedback });
    interviewFeedback = [];
  } catch (error) {
    console.error("Error retrieving interview feedback:", error);
    res.status(500).json({ error: "Failed to retrieve interview feedback" });
  }
}

module.exports = {
  getQuestion,
  analyzeResponse,
  getInterviewFeedback,
};
