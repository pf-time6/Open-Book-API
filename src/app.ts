import "reflect-metadata"
import "express-async-errors"
import express, { json } from "express";
import {
  authorRoutes,
  loginRouter,
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
app.use("/login", loginRouter);
app.use("", booksRoutes);
app.use("", pagesRoutes);
app.use("", categoriesRoutes);

app.use(errorHandler);

export default app;
