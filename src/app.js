import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { router } from "./routes.js";  // Ajuste o caminho para suas rotas, se necessário

// Criando __dirname manualmente no contexto do ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Habilitar CORS (se necessário)
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, "uploads")));


app.use(express.json());

// Configuração das rotas
app.use(router);

// Iniciar o servidor
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
