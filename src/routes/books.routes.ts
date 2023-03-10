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
  isAdmOrBookAuthorMiddleware,
  ensureBookExists,
  deleteBookController
);
booksRoutes.patch("/:id/:page", ensureAuthMiddleware,  isAdmOrBookAuthorMiddleware, editBookPageController);
booksRoutes.delete("/:id/:page", ensureAuthMiddleware, isAdmOrBookAuthorMiddleware, deleteBooksPageController);

export default booksRoutes;
