import { Router } from "express";

import {
  createAuthorController,
  deleteAuthorController,
  getAuthorController,
  listAllAuthorsController,
  restoreAuthorController,
  updateAuthorController,
} from "../controllers/author";
import {
  ensureAuthMiddleware,
  fieldsNotPermitedUpdateMiddleware,
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
  fieldsNotPermitedUpdateMiddleware,
  validateSchemaMiddleware(updateAuthorRequestSchema),
  updateAuthorController
);
authorRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  isAdmOrOwnAuthorMiddleware,
  deleteAuthorController
);
authorRoutes.delete(
  "/restore/:id",
  ensureAuthMiddleware,
  isAdmOrOwnAuthorMiddleware,
  restoreAuthorController
);

export default authorRoutes;
