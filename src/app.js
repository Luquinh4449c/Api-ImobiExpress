import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { router } from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 🛡️ Domínios permitidos (adicione os que a Vercel gerar)
const allowedOrigins = [
  'https://imobi-exspress-res.vercel.app',
  'https://imobi-exspress.vercel.app',
   'https://imobi-exspress-p7pvqw2em-lucas-miguels-projects-36305e90.vercel.app/'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ CORS bloqueado para:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Antes das rotas
app.options('*', cors());


// 🗂️ Arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
app.use(express.json());

// 📦 Rotas
app.use(router);

// 🚀 Porta
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
