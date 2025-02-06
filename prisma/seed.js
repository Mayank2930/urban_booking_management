import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Seeding database...");

  // ✅ Add Carpenters
  const carpenters = await prisma.carpenter.createMany({
    data: [
      { name: "James", experience: 5, rating: 4.7 },
      { name: "Ashok Dhaniya", experience: 8, rating: 4.9 },
      { name: "Kashvi Kapoor", experience: 3, rating: 4.5 },
      { name: "Jazzy Singh", experience: 6, rating: 4.8 },
    ],
  });

  console.log("✅ Carpenters added:", carpenters);

  // ✅ Add Slots for Each Carpenter (9 AM to 6 PM, 1-hour slots)
  const carpenterList = await prisma.carpenter.findMany();

  for (const carpenter of carpenterList) {
    for (let hour = 9; hour < 18; hour++) {
      await prisma.slot.create({
        data: {
          carpenterId: carpenter.id,
          startTime: new Date(`2025-02-10T${hour.toString().padStart(2, "0")}:00:00Z`),
          endTime: new Date(`2025-02-10T${(hour + 1).toString().padStart(2, "0")}:00:00Z`),
        },
      });
    }
  }

  console.log("✅ Slots added for all carpenters.");
}

main()
  .catch((error) => {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
