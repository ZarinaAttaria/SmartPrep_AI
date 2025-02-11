const axios = require("axios");
require("dotenv").config();
async function generateQuestions(req, res) {
  const prompt = `Generate a list of famous interview questions for different roles in different oragnizations`;
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
  const questions = response.data.choices[0].message.content.trim();
  console.log(questions);
  res.json({ questions });
}

module.exports = {
  generateQuestions,
};
