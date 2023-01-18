import { Router } from "express";
import {
  createCategoryController,
  deleteCategoiesController,
  patchCategoriesController,
} from "../controllers/categories";
import getCategoriesController from "../controllers/categories/getCategories.controller";
import { ensureAuthMiddleware, validateSchemaMiddleware } from "../middlewares";
import isAdmMiddleware from "../middlewares/isAdm.middleware";
import createCategorySchema from "../schemas/categories/createCategory.schema";
import updateCategorySchema from "../schemas/categories/updateCategory.schema";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "",
  ensureAuthMiddleware,
  validateSchemaMiddleware(createCategorySchema),
  isAdmMiddleware,
  createCategoryController
);
categoriesRoutes.get("", getCategoriesController);
categoriesRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  isAdmMiddleware,
  validateSchemaMiddleware(updateCategorySchema),
  patchCategoriesController
);
categoriesRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  isAdmMiddleware,
  deleteCategoiesController
);

export default categoriesRoutes;
