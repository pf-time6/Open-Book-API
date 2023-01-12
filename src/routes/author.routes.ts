import { Router } from "express";

import {
  createAuthorController,
  getAuthorController,
  listAllAuthorsController,
} from "../controllers/author";
import {
  validateSchemaMiddleware,
} from "../middlewares";
import { createAuthorRequestSchema } from "../schemas/author";

const authorRoutes = Router();

authorRoutes.get("", listAllAuthorsController);
authorRoutes.get("/:id", getAuthorController);
authorRoutes.post(
  "",
  validateSchemaMiddleware(createAuthorRequestSchema),
  createAuthorController
);

export default authorRoutes;
