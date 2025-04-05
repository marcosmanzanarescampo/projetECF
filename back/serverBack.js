import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT_BACK || 3000;

app.get('/api', (req, res) => {
  res.json({ message: 'API server running for route /api' });
});

app.listen(PORT, () => {
  console.log(`backend working on http://localhost:${PORT}`);
});