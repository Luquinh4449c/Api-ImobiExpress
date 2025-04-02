import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async createImobi(request, response) {
    try {
      const thumb = request.file.filename;
  
      const { id, name, email, telefone, tipo, endereco, cidade, uf, valor, descricao } = request.body;

      const user = await prisma.user.findUnique({ where: { id: String(id) } });

      if (!user) {
        return response.json({ message: "Usuário inexistente" });
      }

      const slugify = (str) =>
        str
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "");

      const slug = slugify(tipo);

      const imobi = await prisma.imobi.create({
        data: {
          thumb,
          tipo,
          endereco,
          cidade,
          uf,
          valor: parseFloat(valor),
          descricao,
          name, 
          email, 
          telefone,
          slug,
          userId: user.id,
        }
      });

      return response.json({
        error: false,
        message: "Sucesso: Imóvel cadastrado com sucesso!",
        imobi
      });

    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async findAllImobi(request, response) {
    try {
      const imobi = await prisma.imobi.findMany({
        include: {
          author: true, // Ensure `author` exists in Prisma schema
        }
      });

      return response.json(imobi);
    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async findImobi(request, response) {
    try {
      const { slug } = request.params;

      const imobi = await prisma.imobi.findFirst({
        where: {
          slug: slug
        }
      });

      if (!imobi) {
        return response.json({ message: "Não encontramos nenhum imóvel cadastrado!" });
      }

      return response.json(imobi);
    } catch (error) {
      return response.json({ message: error.message });
    }
  },

  async createMessage(request, response) {
    try {
      const { name, email, mensagem, userId } = request.body; // Ensure it's 'mensagem'

      const message = await prisma.message.create({
        data: {
          name, 
          email, 
          mensagem, 
          userId
        }
      });

      return response.json(message);
    } catch (error) {
      return response.json({ message: error.message });
    }
  }
};
