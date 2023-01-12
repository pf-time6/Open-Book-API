import { Router } from "express";

import {
  createAuthorController,
  getAuthorController,
  listAllAuthorsController,
  updateAuthorController,
} from "../controllers/author";
import {
  ensureAuthMiddleware,
  isAdmOrOwnAuthorMiddleware,
  isValidIdMiddleware,
  validateSchemaMiddleware,
} from "../middlewares";
import {
  createAuthorRequestSchema,
  updateAuthorRequestSchema,
} from "../schemas/author";

const authorRoutes = Router();

authorRoutes.get("", listAllAuthorsController);
authorRoutes.get("/:id", getAuthorController);
authorRoutes.post(
  "",
  validateSchemaMiddleware(createAuthorRequestSchema),
  createAuthorController
);
authorRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  isValidIdMiddleware,
  isAdmOrOwnAuthorMiddleware,
  validateSchemaMiddleware(updateAuthorRequestSchema),
  updateAuthorController
);

export default authorRoutes;
