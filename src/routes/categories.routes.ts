import { Router } from "express";
import { createCategoryController } from "../controllers/categories";
import getCategoriesController from "../controllers/categories/getCategories.controller";
import { ensureAuthMiddleware } from "../middlewares";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const categoriesRoutes = Router();

categoriesRoutes.post("", ensureAuthMiddleware, isAdmMiddleware, createCategoryController);
categoriesRoutes.get("", getCategoriesController)

export default categoriesRoutes;
