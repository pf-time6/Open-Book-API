import "reflect-metadata";
import "express-async-errors";
import express, { json } from "express";
import {
  authorRoutes,
  loginRoutes,
  booksRoutes,
  categoriesRoutes,
  pagesRoutes,
} from "./routes";
import { errorHandler } from "./errors";

//INSTANCIA EXPRESS
const app = express();
app.use(json());

//ROTAS
app.use("/author", authorRoutes);
app.use("/login", loginRoutes);
app.use("/books", booksRoutes);
app.use("", pagesRoutes);
app.use("/categories", categoriesRoutes);

app.use(errorHandler);

export default app;
