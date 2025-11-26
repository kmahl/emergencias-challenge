import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Crear tipos de teléfono normalizados
  const phoneTypes = ['mobile', 'home', 'work', 'fax', 'other'];

  for (const typeName of phoneTypes) {
    await prisma.phoneType.upsert({
      where: { typeName },
      update: {},
      create: { typeName },
    });
  }

  console.log(`✅ ${phoneTypes.length} phone types created/updated`);

  const count = await prisma.phoneType.count();
  console.log(`📊 Total phone types in database: ${count}`);

  console.log('🎉 Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
