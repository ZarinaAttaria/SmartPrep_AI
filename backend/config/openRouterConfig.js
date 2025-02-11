
const axios = require('axios');
require('dotenv').config();

const openRouter = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    "Authorization": `Bearer ${process.env.API_KEY}`, // Ensure API key is set correctly
    'Content-Type': 'application/json',
  },
});

module.exports = openRouter;

