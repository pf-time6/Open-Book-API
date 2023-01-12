import { Router } from "express";
import { listBooksController, createBookController, showBookController } from "../controllers/books";
import { createPagesController } from "../controllers/pages";
import { ensureAlreadyExistChapter, ensureAuthMiddleware, ensureBookExists, validateSchemaMiddleware } from "../middlewares";
import { createBooksRequestSchema } from "../schemas/books";
import { createPageRequestSchema } from "../schemas/pages";

const booksRoutes = Router();

booksRoutes.post("",
  validateSchemaMiddleware(createBooksRequestSchema),
  ensureAuthMiddleware,
  createBookController
);
booksRoutes.get("", 
  listBooksController
);
booksRoutes.get("/:id", 
  ensureBookExists, 
  showBookController
);
booksRoutes.post("/:id",
  validateSchemaMiddleware(createPageRequestSchema), 
  ensureAuthMiddleware, 
  ensureBookExists, 
  ensureAlreadyExistChapter, 
  createPagesController
);


export default booksRoutes;
