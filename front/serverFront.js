// import dotenv from "dotenv";
import http from "http";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Charger les variables d'environnement
// dotenv.config();

// Configuration des chemins
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT_FRONT || 4000;

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
};

const server = http.createServer(async (req, res) => {
  try {
    // Déterminer le fichier à servir
    let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);

    // Déterminer le type MIME
    const extname = path.extname(filePath);
    const contentType = MIME_TYPES[extname] || "text/plain";

    // Lire et envoyer le fichier
    const content = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  } catch (error) {
    // Gérer les erreurs (fichier non trouvé, etc.)
    res.writeHead(404);
    res.end("File not found. " + error.message);
  }
});

server.listen(PORT, () => {
  console.log(`Front Server running on http://localhost:${PORT}`);
});
