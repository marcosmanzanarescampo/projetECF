import dotenv from 'dotenv';
import express from 'express';
import routes from "../routes/routes.js"
import cors from 'cors';

// const PORT = process.env.PORT_BACK || 3000;
const PORT = 3000;

const app = express();

dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT);

console.log('API server working on port ' + PORT);