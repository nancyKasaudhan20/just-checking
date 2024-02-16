import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import env from 'dotenv';
import OpenAI from 'openai';

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());

// Configure OpenAI API
const openai = new OpenAI({
    organization:"org-0S2GCMaOA6bbFHAeDzRdCSbX",
    apiKey: process.env.OPENAI_API_KEY
});


// Listening
app.listen("3080", () => console.log("Listening on port 3080"));

// Dummy route to test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Post route for making requests
app.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });

    res.json({ message: response.data.choices[0].text });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});
