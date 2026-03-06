import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import API handlers
// We use dynamic imports or require because these are likely ES modules or TS files
// Since we are running with tsx, we can import them directly if they export default
import chatHandler from './api/chat.ts';
import quizHandler from './api/quiz.ts';
import surahSummaryHandler from './api/surah-summary.ts';
import tafseerBatchHandler from './api/tafseer-batch.ts';
import tafseerHandler from './api/tafseer.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Routes
  // Wrap Vercel-style handlers (req, res) for Express
  const wrapHandler = (handler: any) => async (req: express.Request, res: express.Response) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };

  app.all('/api/chat', wrapHandler(chatHandler));
  app.all('/api/quiz', wrapHandler(quizHandler));
  app.all('/api/surah-summary', wrapHandler(surahSummaryHandler));
  app.all('/api/tafseer-batch', wrapHandler(tafseerBatchHandler));
  app.all('/api/tafseer', wrapHandler(tafseerHandler));

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving (if needed, though Vercel handles this differently)
    app.use(express.static(path.join(__dirname, 'dist')));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
