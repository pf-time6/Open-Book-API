import { Router } from "express";
import {
  createCategoryController,
  deleteCategoiesController,
  patchCategoriesController,
} from "../controllers/categories";
import getCategoriesController from "../controllers/categories/getCategories.controller";
import { ensureAuthMiddleware, validateSchemaMiddleware } from "../middlewares";
import isAdmMiddleware from "../middlewares/isAdm.middleware";
import createCategorySchema from "../schemas/categories/loginAuthor.schema";

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
  patchCategoriesController
);
categoriesRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  isAdmMiddleware,
  deleteCategoiesController
);

export default categoriesRoutes;
