import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

// Criar __dirname no contexto do ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para a pasta onde os arquivos serão armazenados
const tempFolder = path.resolve(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, tempFolder);  // Pasta onde os arquivos serão armazenados
  },
  filename(req, file, cb) {
    const hash = crypto.randomBytes(10).toString('hex');
    const filename = `${hash}-${file.originalname}`;  // Nome único para evitar sobrescrições
    cb(null, filename);
  }
});

// Configuração do multer
const upload = multer({ storage });

export default upload;
