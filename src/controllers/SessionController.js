import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export default {
  async createSession(req, res) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'E-mail incorreto' });
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      // Remove a senha do objeto do usuário antes de retornar
      delete user.password;

      if (!JWT_SECRET) {
        return res.status(500).json({ error: 'JWT_SECRET não está configurado.' });
      }

      // Cria o token com o id do usuário
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

      // Retorna o token e informações do usuário
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Erro ao criar sessão:', error);
      res.status(500).json({ message: 'Erro ao criar sessão' });
    }
  },
};
