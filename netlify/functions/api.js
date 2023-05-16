import dotenv from 'dotenv';
dotenv.config();

import { Configuration, OpenAIApi } from 'openai';
import cors from 'cors';
import bodyParser from 'body-parser';

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// openai configuration
const configuration = new Configuration({
  organization: 'org-Afl5yl2Yr3FiTJMEqEHM1tKn',
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// routes
app.post('/generate-cover-letter', async (req, res) => {
  console.log('POST /generate-cover-letter');

  const { companyName, yourName, position, jobRequirements, yourExperience } =
    req.body;

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    // model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: `Hi, please make me a cover letter for the position of ${position} at ${companyName}. Here is the job requirements: ${jobRequirements}. Here is my relevant experience: ${yourExperience}. And my name is ${yourName}`,
      },
    ],
  });

  res.json({
    completion: completion.data.choices[0].message,
  });
});

app.get('/api/example', (req, res) => {
  res.json({
    message: 'Hello from Netlify serverless function using Express!',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports.handler = async (event, context) => {
  return await app(event, context);
};
