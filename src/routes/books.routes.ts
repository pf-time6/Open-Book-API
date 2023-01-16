import { Router } from "express";
import {
  listBooksController,
  createBookController,
  showBookController,
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
  isAdmOrBookAuthorMiddleware,
  isAdmOrOwnAuthorMiddleware,
  validateSchemaMiddleware,
} from "../middlewares";
import { createBooksRequestSchema } from "../schemas/books";
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
  isAdmOrOwnAuthorMiddleware,
  ensureAlreadyExistChapter,
  createPagesController
);
booksRoutes.get(
  "/:id/:page",
  ensureBookExists,
  ensurePageExists,
  showPageController
);

export default booksRoutes;
