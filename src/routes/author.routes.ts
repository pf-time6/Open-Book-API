import { Router } from "express";
import { createAuthorController } from "../controllers/author";

const authorRouter = Router();

authorRouter.post("", createAuthorController);

export default authorRouter;
