require('dotenv').config();

const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

const { Configuration, OpenAIApi } = require('openai');

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  organization: 'org-Afl5yl2Yr3FiTJMEqEHM1tKn',
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

//Create new record
router.post('/generate-cover-letter', async (req, res) => {
  console.log('POST /generate-cover-letter');

  const { companyName, yourName, position, jobRequirements, yourExperience } =
    req.body;

  const completion = await openai.createChatCompletion({
    model: 'curie',
    // model: 'gpt-3.5-turbo',
    // model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: `Hi, please make me a cover letter for the position of ${position} at ${companyName}. Here is the job requirements: ${jobRequirements}. Here is my relevant experience: ${yourExperience}. And my name is ${yourName}`,
        // content: 'Hi',
      },
    ],
  });

  res.json({
    completion: completion.data.choices[0].message,
  });
});

let records = [];

//Get all students
router.get('/', (req, res) => {
  res.send(`App is running ON PORT: ${process.env.PORT}`);
});

//Create new record
router.post('/add', (req, res) => {
  res.send('New record added.');
});

//delete existing record
router.delete('/', (req, res) => {
  res.send('Deleted existing record');
});

//updating existing record
router.put('/', (req, res) => {
  res.send('Updating existing record');
});

//showing demo records
router.get('/demo', (req, res) => {
  res.json([
    {
      id: '001',
      name: 'Smith',
      email: 'smith@gmail.com',
    },
    {
      id: '002',
      name: 'Sam',
      email: 'sam@gmail.com',
    },
    {
      id: '003',
      name: 'lily',
      email: 'lily@gmail.com',
    },
  ]);
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
