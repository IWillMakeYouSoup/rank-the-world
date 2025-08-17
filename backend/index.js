import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './db.js';

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware to parse JSON bodies and allow cross‑origin requests
app.use(cors());
app.use(express.json());

/**
 * POST /api/vote
 *
 * Accepts a payload containing the attribute being compared and the names of
 * the winning and losing animals.  Writes a new row to the `votes` table.
 *
 * Expected body:
 * {
 *   "attribute": "cutest",
 *   "winner": "cat",
 *   "loser": "dog"
 * }
 */
app.post('/api/vote', async (req, res) => {
  const { attribute, winner, loser } = req.body || {};
  // Basic validation
  if (!attribute || !winner || !loser) {
    return res.status(400).json({ message: 'attribute, winner and loser are required fields' });
  }
  try {
    // Insert the vote into the database
    await query(
      'INSERT INTO votes (attribute, winner, loser) VALUES (?, ?, ?)',
      [attribute, winner, loser]
    );
    return res.status(201).json({ message: 'Vote recorded successfully' });
  } catch (error) {
    console.error('Error saving vote:', error);
    return res.status(500).json({ message: 'Failed to record vote' });
  }
});

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
