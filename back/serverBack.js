import dotenv from 'dotenv';
import express from 'express';
import router from "../routes/routes.js"
import cors from 'cors';

// const PORT = process.env.PORT_BACK || 3000;
const PORT = 3000;

const app = express();

dotenv.config();

// middlewares
app.use(cors());

app.use('/api', router); // optionnel : préfixe "api", ex: /api/auth/login

app.listen(PORT);

console.log('server working on port ' + PORT);