import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 🛡️ Domínios permitidos (inclui domínio temporário da Vercel)
const allowedOrigins = [
  'https://imobi-exspress-res.vercel.app',
  'https://imobi-exspress.vercel.app',
  'https://imobi-exspress-p7pvqw2em-lucas-miguels-projects-36305e90.vercel.app',
  'https://imobi-exspress-py5c2b92m-lucas-miguels-projects-36305e90.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite chamadas sem origin (como Postman) ou dos domínios autorizados
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.includes('vercel.app') // ← ⚠️ remove isso em produção se quiser segurança máxima
    ) {
      callback(null, true);
    } else {
      console.log('❌ CORS bloqueado para:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Suporte a preflight requests
app.options('*', cors());

// 🗂️ Arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

// 📦 Middleware para JSON
app.use(express.json());

// 🌐 Rotas
app.use(router);

// 🚀 Inicia o servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
