import { Router } from "express";
import { createCategoryController } from "../controllers/categories";
import { ensureAuthMiddleware, ensureAuthorAdmMiddleware } from "../middlewares";

const categoriesRoutes = Router();

categoriesRoutes.post('',ensureAuthMiddleware, ensureAuthorAdmMiddleware, createCategoryController)

export default categoriesRoutes;
