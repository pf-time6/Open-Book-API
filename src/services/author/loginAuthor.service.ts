import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";
import { AppError } from "../../errors";
import {
  ICreateSessionRequest,
  ICreateSessionResponse,
} from "../../interfaces/session.interface";

const loginAuthorService = async (
  payload: ICreateSessionRequest
): Promise<ICreateSessionResponse> => {
  const authorRepo = AppDataSource.getRepository(Author);
  const authorFound = await authorRepo.findOne({
    where: { email: payload.email },
  });
  if (!authorFound) {
    throw new AppError("Author/password is invalid", 404);
  }

  const passwordMatch = await bcrypt.compare(
    payload.password,
    authorFound.password
  );

  if (!passwordMatch) {
    throw new AppError("Author/password is invalid", 401);
  }

  const token = jwt.sign(
    { email: authorFound.email, isAdm: authorFound.isAdm },
    process.env.SECRET_KEY,
    { expiresIn: "24h", subject: authorFound.id }
  );

  return { token: token };
};

export default loginAuthorService;
