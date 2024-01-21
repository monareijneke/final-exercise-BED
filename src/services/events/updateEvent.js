import { PrismaClient } from "@prisma/client";

const updateEventById = async (id, updatedEvent) => {
  const prisma = new PrismaClient();
  const { categoryIds, createdBy, ...rest } = updatedEvent;
  const event = await prisma.event.update({
    where: { id },
    data: {
      ...rest,
      createdBy: createdBy ? { connect: { id: createdBy } } : undefined,
      categories: categoryIds
        ? {
            set: categoryIds.map(id => ({ id })),
          }
        : undefined,
    },
  });
  return event;
};

export default updateEventById;
