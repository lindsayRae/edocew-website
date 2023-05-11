import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { emailRoute } from './routes/emailRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 1234;

app.use(express.static('public'));
app.use(express.json()); // our server can accept json in body of request

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  // serve any static files
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

app.post('/api/email', (req, res) => {
  emailRoute(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
