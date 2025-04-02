import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
export default {
    async createUser(req, res) {

        const { name, email, password } = req.body

        try {
            let user = await prisma.user.findUnique({ where: { email } })


            if (user) {
                return res.status(400).json({
                    error: true,
                    message: "Usuario já existe",
                    user
                    
                })
            }
            const salt = await bcrypt.genSalt(10)
            const HashPassword = await bcrypt.hash(password, salt)

            user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: HashPassword
                }
            })
            return res.json({
                error: false,
                message: "Usuario criado com sucesso",
                user
            })



        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar usuario" })
        }
    },

    async findAllUser(req, res) {
        try {
            const users = await prisma.user.findMany();
            return res.status(200).json(users);

        } catch (error) {
            console.error("Erro ao buscar usuários:", error); // Log do erro real
            return res.status(500).json({ message: "Erro ao buscar usuários", error: error.message });
        }
    }


}