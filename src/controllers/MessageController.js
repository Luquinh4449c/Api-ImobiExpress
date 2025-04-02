import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async createMessage(request, response) {
    const { client_name, client_email, client_mensagem, userId } = request.body;
    
    try {  
      let messagem = await prisma.messages.findFirst({ where: { client_email } });
      
      if (messagem) {
        return response.json({ 
          error: true,
          message: "Oppss: sua mensagem já foi cadastrada, aguarde resposta do anunciante!" 
        });
      }

      messagem = await prisma.messages.create({
        data: {
          client_name,
          client_email,
          client_mensagem,
          userId
        }
      });

      return response.json({
        error: false,
        message: "Sucesso: Mensagem cadastrada com sucesso!",
        messagem
      });

    } catch (error) {
      return response.json({ message: error.message })
    }
  },

  async findMessage(request, response) {
    try {
      const { id } = request.params;

      // Aqui garantimos que userId é uma String, como no MongoDB
      const messagem = await prisma.messages.findMany({
        where: { userId: id }  // userId é uma String no MongoDB
      });

      return response.json({
        messagem
      });

    } catch (error) {
      return response.json({ message: error.message })
    }
  }
};
