import { Router } from "express";
import {
  listBooksController,
  createBookController,
  showBookController,
  updateBookController,
  deleteBookController,
} from "../controllers/books";
import {
  createPagesController,
  deleteBooksPageController,
  editBookPageController,
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
  isAdmOrOwnAuthorMiddleware,
  ensureAlreadyExistChapter,
  createPagesController
);
booksRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  isAdmOrBookAuthorMiddleware,
  validateSchemaMiddleware(updateBookRequestSchema),
  updateBookController
);
booksRoutes.get(
  "/:id/:page",
  ensureBookExists,
  ensurePageExists,
  showPageController
);
booksRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  isAdmOrOwnAuthorMiddleware,
  ensureBookExists,
  deleteBookController
);
booksRoutes.patch("/:id/:page", ensureAuthMiddleware, editBookPageController);
booksRoutes.delete("/:id/:page", ensureAuthMiddleware, deleteBooksPageController);

export default booksRoutes;
