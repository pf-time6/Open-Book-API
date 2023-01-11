import { Router } from "express";
import { createCategoryController } from "../controllers/categories";

const categoriesRoutes = Router();

categoriesRoutes.post('', createCategoryController)

export default categoriesRoutes;
