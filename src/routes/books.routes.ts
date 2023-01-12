import { Router } from "express";
import { listBooksController, createBookController, showBookController } from "../controllers/books";
import { createPagesController } from "../controllers/pages";
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
booksRoutes.get("/:id", showBookController);
booksRoutes.post("/:id", createPagesController);


export default booksRoutes;
