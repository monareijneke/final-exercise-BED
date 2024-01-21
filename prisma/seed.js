import { PrismaClient } from "@prisma/client";
import userData from "../src/data/users.json" assert { type: "json" };
import categoryData from "../src/data/categories.json" assert { type: "json" };
import eventData from "../src/data/events.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { users } = userData;
  const { categories } = categoryData;
  const { events } = eventData;

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    });
  }

  for (const event of events) {
    //alles copy van solution
    await prisma.event.upsert({
      where: { id: event.id },
      update: {},
      create: {
        id: event.id,
        title: event.title,
        description: event.description,
        image: event.image,
        location: event.location,
        startTime: event.startTime,
        endTime: event.endTime,
        categories: {
          connect: event.categoryIds.map(id => ({ id })),
        },
        createdBy: {
          connect: { id: event.createdBy },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
