require('dotenv').config();
console.log(process.env.DATABASE_URL);
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.box.createMany({
    data: [
      { name: 'Box A', length: 42, width: 42, height: 60 },
      { name: 'Box B', length: 42, width: 42, height: 30 },
    ],
  });

  await prisma.pricing.upsert({
    where: { id: 1 },
    update: {},
    create: {
      ratePerCubicM: 472.41,
      deliveryCharge: 5.0
    }
  });
}

main()