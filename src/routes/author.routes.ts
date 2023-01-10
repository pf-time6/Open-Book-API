import { Router } from "express";

import { createAuthorController } from "../controllers/author";

const authorRoutes = Router();

authorRoutes.post("", createAuthorController);

export default authorRoutes;
