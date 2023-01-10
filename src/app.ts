import express, { json } from "express";
import { errorHandler } from "./errors";
import authorRoutes from "./routes/author.routes";
import booksRoutes from "./routes/books.routes";
import categoriesRoutes from "./routes/categories.routes";
import pagesRoutes from "./routes/pages.routes";

const app = express();

app.use(json());

app.use("", authorRoutes);
app.use("", booksRoutes);
app.use("", pagesRoutes);
app.use("", categoriesRoutes);

app.use(errorHandler);

export default app;
