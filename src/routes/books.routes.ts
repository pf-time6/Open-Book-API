import { Router } from "express";
import { listBooksController } from "../controllers/books";
import createBookController from "../controllers/books/createBook.controller";
import { ensureAuthMiddleware, validateSchemaMiddleware } from "../middlewares";
import { createBooksRequestSchema } from "../schemas/books";

const booksRoutes = Router();

booksRoutes.post(
  "",
  validateSchemaMiddleware(createBooksRequestSchema),
  ensureAuthMiddleware,
  createBookController
);

booksRoutes.get("", listBooksController);

export default booksRoutes;
