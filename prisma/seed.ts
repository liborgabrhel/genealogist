import { prisma } from "~/utils/db.server"

async function seed() {
  console.log("🌱 Seeding...")
  console.time(`🌱 Database has been seeded`)
  console.timeEnd(`🌱 Database has been seeded`)
}

seed()
  .catch((error) => {
    console.error(error)
    // noinspection TypeScriptValidateJSTypes
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
