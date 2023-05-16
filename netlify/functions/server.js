const express = require('express');
const app = express();

// Define your routes and middleware here

// Example route
app.get('/api/hello', (req, res) => {
  res.send('Hello from Express on Netlify Functions!');
});

module.exports = app;

const app = require('./server');

exports.handler = async (event, context) => {
  return await new Promise((resolve, reject) => {
    // Emulate Express request and response objects
    const req = {
      ...event,
      url: event.path,
      path: event.path,
      httpMethod: event.httpMethod,
      headers: event.headers,
      queryStringParameters: event.queryStringParameters,
      body: event.body ? JSON.parse(event.body) : {},
    };
    const res = {
      statusCode: 200,
      setHeader: () => {},
      end: (body) => {
        resolve({
          statusCode: res.statusCode,
          body: body,
          headers: res.headers,
        });
      },
    };

    // Pass the request and response to the Express app
    app(req, res);
  });
};
