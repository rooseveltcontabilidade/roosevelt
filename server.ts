import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { generateReply } from './src/lib/llm';

const app = express();
const PORT = 3001;

import * as fs from 'fs';

// Middleware (with file logging)
app.use(cors()); 
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  const log = `\n[${new Date().toISOString()}] ${req.method} ${req.url}\nHeaders: ${JSON.stringify(req.headers)}\nBody: ${JSON.stringify(req.body)}\n`;
  console.log(log);
  fs.appendFileSync('server.log', log);
  next();
});

// Chat Endpoint
app.post('/api/chat', async (req: any, res: any) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
       const errorMsg = `Invalid payload: messages array required. Body was: ${JSON.stringify(req.body)}`;
       console.error(errorMsg);
       fs.appendFileSync('server.log', `Validation Error: ${errorMsg}\n`);
       return res.status(400).json({ error: 'Invalid payload: messages array required' });
    }

    // Basic Validation
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid payload: messages array required' });
    }

    // Call LLM
    const reply = await generateReply({ messages });

    // Respond with JSON
    return res.json({ reply });

  } catch (error: any) {
    const errorMsg = `\n[${new Date().toISOString()}] Server Internal Error: ${error.message || String(error)}\nStack: ${error.stack || ''}\n`;
    console.error(errorMsg);
    fs.appendFileSync('server.log', errorMsg);
    
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error.message || String(error) 
    });
  }
});

// Health Check
app.get('/', (req, res) => {
  res.send('Roosevelt Chat Backend is Running 🚀');
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`🧠 Provider: ${process.env.LLM_PROVIDER || 'groq (default)'}`);
});
