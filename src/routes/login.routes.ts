import { Router } from "express";
import { loginAuthorController } from "../controllers/author";

const loginRouter = Router();

loginRouter.post("", loginAuthorController);

export default loginRouter;
