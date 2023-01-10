import express, { json } from "express";
import { authorRouter, loginRouter } from "./routes";

//INSTANCIA EXPRESS
const app = express();
app.use(json());

//ROTAS
app.use("/author", authorRouter);
app.use("/login", loginRouter);

export default app;
