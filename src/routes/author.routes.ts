import { Router } from "express";

import {
  createAuthorController,
  deleteAuthorController,
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
authorRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  isAdmOrOwnAuthorMiddleware,
  deleteAuthorController
);

export default authorRoutes;
