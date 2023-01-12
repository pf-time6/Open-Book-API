import { Router } from "express";
import { loginAuthorController } from "../controllers/author";
import { ensureAuthMiddleware, validateSchemaMiddleware } from "../middlewares";
import { loginAuthorSchema } from "../schemas/author";

const loginRoutes = Router();

loginRoutes.post(
  "",
  validateSchemaMiddleware(loginAuthorSchema),
  loginAuthorController
);

export default loginRoutes;
