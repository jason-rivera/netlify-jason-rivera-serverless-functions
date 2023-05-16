const express = require('express');
const app = express();

app.get('/api/example', (req, res) => {
  res.json({
    message: 'Hello from Netlify serverless function using Express!',
  });
});

module.exports.handler = async (event, context) => {
  return await app(event, context);
};
