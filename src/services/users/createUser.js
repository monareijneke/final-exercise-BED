import { PrismaClient } from "@prisma/client";

const createUser = async (username, name, password, image) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: {
      name,
      username,
      password,
      image,
    },
  });

  return user;
};

export default createUser;
