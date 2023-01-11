import { Router } from "express";
import { createCategoryController } from "../controllers/categories";
import { ensureAuthMiddleware } from "../middlewares";
import ensureAuthorAdmMiddleware from "../middlewares/ensureAuthorAdm.middleware";

const categoriesRoutes = Router();

categoriesRoutes.post('',ensureAuthMiddleware, ensureAuthorAdmMiddleware, createCategoryController)

export default categoriesRoutes;
