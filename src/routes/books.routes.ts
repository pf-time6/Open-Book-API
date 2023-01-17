import { Router } from "express";
import {
  listBooksController,
  createBookController,
  showBookController,
  updateBookController,
} from "../controllers/books";
import {
  createPagesController,
  showPageController,
} from "../controllers/pages";
import {
  ensureAlreadyExistChapter,
  ensureAuthMiddleware,
  ensureBookExists,
  ensurePageExists,
  isAdmOrOwnAuthorMiddleware,
  validateSchemaMiddleware,
} from "../middlewares";
import {
  createBooksRequestSchema,
  updateBookRequestSchema,
} from "../schemas/books";
import { createPageRequestSchema } from "../schemas/pages";

const booksRoutes = Router();

booksRoutes.post(
  "",
  validateSchemaMiddleware(createBooksRequestSchema),
  ensureAuthMiddleware,
  createBookController
);
booksRoutes.get("", listBooksController);
booksRoutes.get("/:id", ensureBookExists, showBookController);
booksRoutes.post(
  "/:id",
  validateSchemaMiddleware(createPageRequestSchema),
  ensureAuthMiddleware,
  ensureBookExists,
  isAdmOrBookAuthorMiddleware,
  ensureAlreadyExistChapter,
  createPagesController
);
booksRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  isAdmOrOwnAuthorMiddleware,
  validateSchemaMiddleware(updateBookRequestSchema),
  updateBookController
);
booksRoutes.get(
  "/:id/:page",
  ensureBookExists,
  ensurePageExists,
  showPageController
);

export default booksRoutes;
