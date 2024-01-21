import { Router } from "express";
import getCategories from "../services/categories/getCategories.js";
import getCategoryById from "../services/categories/getCategoryById.js";
import deleteCategoryById from "../services/categories/deleteCategory.js";
import updateCategoryById from "../services/categories/updateCategory.js";
import createCategory from "../services/categories/createCategory.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);

    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: `Category with id${id} not found!` });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await deleteCategoryById(id);

    if (category) {
      res
        .status(200)
        .send({ message: `Category with id ${id} succesfully deleted` });
    } else {
      res.status(404).json({ message: `Category wirh id${id} not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await createCategory(name);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await updateCategoryById(id, { name });

    if (category) {
      res
        .status(200)
        .send({ message: `Category with id${id} succesfully updated` });
    } else {
      res.status(404).json({ message: `Category with id${id} not found` });
    }
  } catch (error) {
    next(error);
  }
});
export default router;
