import { Router } from "express";
import {
  createCategoryController,
  deleteCategoiesController,
  patchCategoriesController,
} from "../controllers/categories";
import getCategoriesController from "../controllers/categories/getCategories.controller";
import { ensureAuthMiddleware } from "../middlewares";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const categoriesRoutes = Router();

  categoriesRoutes.post("", ensureAuthMiddleware, isAdmMiddleware,  createCategoryController);
  categoriesRoutes.get("", getCategoriesController);
  categoriesRoutes.patch("/:id", ensureAuthMiddleware, isAdmMiddleware, patchCategoriesController);
  categoriesRoutes.delete("/:id",ensureAuthMiddleware, isAdmMiddleware, deleteCategoiesController);

export default categoriesRoutes;
