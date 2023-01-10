import { Router } from "express";

import { createAuthorController } from "../controllers/author";
import { validateSchemaMiddleware } from "../middlewares";
import { createAuthorRequestSchema } from "../schemas/author";

const authorRoutes = Router();

authorRoutes.post(
  "",
  validateSchemaMiddleware(createAuthorRequestSchema),
  createAuthorController
);

export default authorRoutes;
