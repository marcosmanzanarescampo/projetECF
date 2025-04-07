import dotenv from 'dotenv';
import express from 'express';
import routes from "../routes/routes.js"
import cors from 'cors';

const PORT = process.env.PORT_BACK || 3000;

dotenv.config();
const app = express();
app.use(cors());

routes();

app.listen(PORT, () => {
  // console.log(`backend working on http://localhost:${PORT}`);
});