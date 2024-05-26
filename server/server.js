const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { generateBescheid } = require('./bescheidGenerator');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Definiere eine Route für die Wurzel-URL
app.get('/', (req, res) => {
  res.send('Willkommen beim Schornsteinfeger Mängelbescheide Generator!');
});

app.post('/api/generate', (req, res) => {
  const { feuerungsanlage, mangel, schwere, bemerkungen } = req.body;
  if (!feuerungsanlage || !mangel || !schwere) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const bescheid = generateBescheid(feuerungsanlage, mangel, schwere, bemerkungen);
  res.json({ bescheid });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
