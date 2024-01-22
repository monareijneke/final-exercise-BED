import { Router } from "express";
import createUser from "../services/users/createUser.js";
import deleteUserById from "../services/users/deleteUser.js";
import getUserById from "../services/users/getUserById.js";
import getUsers from "../services/users/getUsers.js";
import updateUserById from "../services/users/updateUser.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ message: `User with ID ${id} not found` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { name, password, username, image } = req.body;
    const newUser = await createUser(name, password, username, image);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);

    if (user) {
      res
        .status(200)
        .send({ message: `User with ID ${id} succesfully deleted` });
    } else {
      res.status(404).json({ message: `User with ID ${id} not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, password, username, image } = req.body;
    const user = await updateUserById(id, { name, password, username, image });

    if (user) {
      res
        .status(200)
        .send({ message: `User with id ${id} succesfully updated!` });
    } else {
      res.status(404).json({ message: `User with id ${id} not found!` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
