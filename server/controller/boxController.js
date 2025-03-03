const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const boxController = {
    getAll: async (req, res) => {
        try {
            const boxes = await prisma.box.findMany();
            res.status(200).json({ data: boxes });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getPrice: async (req, res) => {
        try{
            const pricing = await prisma.pricing.findFirst();
            res.json(pricing);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = boxController;