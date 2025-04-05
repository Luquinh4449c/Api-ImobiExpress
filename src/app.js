import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { router } from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(router);

// 🚀 Correção aqui:
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
