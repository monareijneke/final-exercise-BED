import { PrismaClient } from "@prisma/client";

const getEvents = async title => {
  const prisma = new PrismaClient();
  const events = await prisma.event.findMany({
    where: { title: { contains: title } },
  });
  return events;
};

export default getEvents;
