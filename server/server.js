require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const apiKey = process.env.OPENAI_API_KEY;

// Ausgabe des API-Schlüssels zur Überprüfung
console.log('Loaded API Key:', apiKey);

// Funktion zum Abrufen von Daten von der OpenAI-API
async function getChatCompletion(messages) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: messages,
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
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error fetching data from OpenAI API:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Beispiel-API-Endpunkt zur Generierung von Bescheiden
app.post('/api/generate', async (req, res) => {
  const { feuerungsanlage, mangel, schwere, frist, bemerkungen } = req.body;
  if (!feuerungsanlage || !mangel || !schwere || !frist) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const messages = [
    { role: 'system', content: 'You are a helpful assistant that generates legal documents based on input parameters.' },
    { role: 'user', content: `Feuerungsanlage: ${feuerungsanlage}, Mangel: ${mangel}, Schwere: ${schwere}, Frist: ${frist}, Bemerkungen: ${bemerkungen}` }
  ];
  
  try {
    const completion = await getChatCompletion(messages);
    res.json({ completion });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
