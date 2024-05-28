// server.js

// Laden der Umgebungsvariablen aus der .env-Datei
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Funktion zum Abrufen von Daten von der OpenAI-API
async function getCompletion(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = 'davinci:ft-your-organization-2024-05-27-20-45-22'; // Ersetze durch den tatsächlichen Modellnamen

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions', // Verwende den richtigen Endpunkt
      {
        model: 'ft:davinci-002:personal::9TYZFrIi', // Verwende den Namen des feingetunten Modells
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error fetching data from OpenAI API:', error);
    throw error;
  }
}

// Beispiel-API-Endpunkt zur Generierung von Bescheiden
app.post('/api/generate', async (req, res) => {
  const { feuerungsanlage, mangel, schwere, frist, bemerkungen } = req.body;
  if (!feuerungsanlage || !mangel || !schwere || !frist) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const prompt = `Feuerungsanlage: ${feuerungsanlage}, Mangel: ${mangel}, Schwere: ${schwere}, Frist: ${frist}, Bemerkungen: ${bemerkungen}`;
  
  try {
    const completion = await getCompletion(prompt);
    res.json({ completion });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
