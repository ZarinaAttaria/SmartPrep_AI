const axios = require("axios");
require("dotenv").config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function generateQuestion(prompt) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "sophosympatheia/rogue-rose-103b-v0.2:free",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.log(
      "Error with OpenRouter API:",
      error.response?.data || error.message
    );
    throw new Error("Failed to generate question.");
  }
}

async function generateInitialQuestion(req, res) {
  try {
    const { jobDescription } = req.body;

    const prompt = `
      You are conducting a job interview in a realistic and conversational manner. Begin with introductions, build rapport, and create an inviting atmosphere for the candidate. 
      The job description is: "${jobDescription}". 
      Ask a friendly, general opening question to help the candidate relax and share a bit about themselves, such as their background or interests.
      Example: "Can you tell me a little about yourself and how your experience aligns with this role?"
    `;

    const question = await generateQuestion(prompt);
    res.json({ question });
  } catch (error) {
    console.error("Error in generateInitialQuestion:", error.message);
    res.status(500).json({
      message: "Error generating initial question.",
      error: error.message,
    });
  }
}
const analyzeTextResponse = async (req, res) => {
  try {
    const { text, question } = req.body;
    console.log("Received request with text:", text);

    const prompt = `
      Analyze the following response to an interview question "${question}" for clarity, tone, grammar, and completeness:

"${text}"

    clarity: "Assess whether the response is clear and well-structured. Identify any confusing or vague parts.",
    completeness: "Check if the response fully answers the question with relevant details and examples.",
    grammar: "List any grammar or phrasing issues along with corrections.",
    tone: "Evaluate the tone (e.g., professional, casual, unclear) and suggest improvements if necessary.",
    missing_aspects: "Highlight what key details or elements are missing that would make the response stronger.",
    improvement_tips: "Provide specific advice on how to improve the response, such as adding more details, restructuring sentences, or using better examples."
 
 
}
 
    `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "sophosympatheia/rogue-rose-103b-v0.2:free",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );
    const rawContent = response.data.choices[0].message.content.trim();
    console.log("OpenRouter Raw Response:", rawContent);
    let analysis;
    try {
      analysis = rawContent;
    } catch (jsonError) {
      console.error("JSON Parsing Error:", jsonError.message);
      return res.status(500).json({
        message: "OpenRouter response is not a valid JSON string.",
        rawResponse: rawContent,
        error: jsonError.message,
      });
    }

    res.json(analysis);
  } catch (error) {
    console.error(
      "Error in analyzeTextResponse:",
      error.response?.data || error.message
    );
    res.status(500).json({
      message: "Error analyzing text response.",
      error: error.response?.data || error.message,
    });
  }
};

async function generateSampleAnswer(req, res) {
  try {
    const { text, question } = req.body;
    const prompt = `
      Analyze the following response to an interview question "${question}" for clarity, tone, grammar, and completeness:

"${text}"

   
  Sample Answer: "Provide a fully optimized version of the response as if written by a professional or top-performing candidate, incorporating all necessary improvements, structured in a clear and compelling way."
 
}
 
    `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "sophosympatheia/rogue-rose-103b-v0.2:free",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );
    res.json(response.data.choices[0].message.content.trim());
  } catch (error) {
    console.log("Error in generating sample answer", error);
    res.status(500).json({
      message: "Error in generating sample answer",
      error: error.response?.data || error.message,
    });
  }
}
async function generateFollowUpQuestion(req, res) {
  try {
    const { previousResponse, responses } = req.body;

    const prompt = `
      You are continuing a job interview in a structured, realistic way. Based on the candidate's previous response: "${previousResponse}" and the interview context so far (previous interactions: ${JSON.stringify(
      responses
    )}), 
   
      generate a follow-up question that aligns with the current stage of the interview:
      
      Objective:
You are an AI interviewer designed to conduct professional job interviews. Your role is to assess the candidate’s skills, knowledge, problem-solving abilities, and critical thinking based on their field of expertise. You will ask industry-specific questions, evaluate responses, and provide constructive feedback.

General Guidelines for Questioning
Start with a Warm Introduction

Begin with a brief greeting and introduction to make the candidate comfortable.
Example:
"Hello! Welcome to this interview. Today, we will be discussing your skills and expertise in [field]. Let's get started!"
Question Structuring

Start with basic questions to assess foundational knowledge.
Move on to scenario-based and problem-solving questions.
Conclude with behavioral and situational questions.
Maintain Adaptability

If a candidate struggles, provide hints or rephrase the question.
If a candidate excels, ask follow-up questions to assess deeper understanding.
Encourage Detailed Responses

Avoid simple "yes/no" questions. Instead, ask "how" and "why" questions.
Field-Specific Questions e.g:
1. Software Engineering & Development
Basic Questions
What is the difference between object-oriented and functional programming?
Can you explain the SOLID principles in software design?
What are the key differences between SQL and NoSQL databases?
Scenario-Based Questions
You are given a slow-performing database query. How would you optimize it?
Your team is facing a critical bug in production. What steps would you take to resolve it?
Behavioral Questions
Tell me about a time you had to work under tight deadlines. How did you handle it?
2. Data Science & Machine Learning
Basic Questions
What is the difference between supervised, unsupervised, and reinforcement learning?
Can you explain overfitting and how to prevent it?
What are some key evaluation metrics for classification models?
Scenario-Based Questions
Suppose you have an imbalanced dataset. How would you handle it?
You trained a model that performs well on training data but poorly on real-world data. What could be the reasons?
Behavioral Questions
Tell me about a challenging dataset you worked with. How did you approach cleaning and analyzing it?
3. Cybersecurity
Basic Questions
What is the difference between symmetric and asymmetric encryption?
Can you explain the concept of Zero Trust Security?
Scenario-Based Questions
A company's network is experiencing a DDoS attack. What steps would you take to mitigate the attack?
You discover a potential data breach. How would you respond?
Behavioral Questions
Describe a time you had to convince management to implement a security measure they were hesitant about.
4. Marketing & Digital Strategy
Basic Questions
What are the key differences between SEO and SEM?
Can you explain how A/B testing works in digital marketing?
Scenario-Based Questions
Suppose your company’s ad campaign is underperforming. How would you diagnose the problem and improve ROI?
If a competitor launches an aggressive marketing campaign, how would you respond strategically?
Behavioral Questions
Tell me about a marketing strategy you implemented that had a significant impact.
5. Finance & Investment
Basic Questions
What is the difference between fundamental analysis and technical analysis?
Can you explain the concept of risk diversification?
Scenario-Based Questions
Imagine you're advising a client who wants to invest in stocks but is risk-averse. What investment strategy would you recommend?
How would you handle market volatility affecting your investment portfolio?
Behavioral Questions
Tell me about a time you had to make a difficult financial decision.
6. Human Resources & Talent Management
Basic Questions
What are the best strategies for retaining top talent in an organization?
How do you handle conflicts between employees?
Scenario-Based Questions
You notice a decline in employee engagement. How would you address this issue?
If an employee repeatedly misses deadlines, what steps would you take?
Behavioral Questions
Tell me about a time you had to mediate a dispute between two team members.

      
      remember dont just stick with one thing and keep asking questions on that move forward toward next question after candidate provides a answer
      Ensure the tone remains conversational, professional, and aligned with the stage of the interview.
 asking 5 questions end the interview . display end.
    `;

    const nextQuestion = await generateQuestion(prompt);
    res.json({ nextQuestion });
  } catch (error) {
    console.error("Error in generateFollowUpQuestion:", error.message);
    res.status(500).json({
      message: "Error generating follow-up question.",
      error: error.message,
    });
  }
}
async function generateDetailedFeedback(req, res) {
  try {
    const { responses } = req.body;
    const prompt = `Based on all these responses :${responses} generate a detailed feedback on user's interview, how they performed, what they are lacking and how they can improve themselves in future interviews`;
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "sophosympatheia/rogue-rose-103b-v0.2:free",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );
    const feedback = response.data.choices[0].message.content.trim();
    console.log(feedback);
    res.json({ feedback });
  } catch (error) {
    console.log("Error in generating detailed feedback", error);
    res.status(500).json({
      message: "Error in generating detailed feedback",
      error: error.message,
    });
  }
}
module.exports = {
  generateInitialQuestion,
  generateFollowUpQuestion,
  analyzeTextResponse,
  generateDetailedFeedback,
  generateSampleAnswer,
};
