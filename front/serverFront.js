import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT_FRONT || 4000;

console.log(`frontEnd server working on http://localhost:${PORT}`);