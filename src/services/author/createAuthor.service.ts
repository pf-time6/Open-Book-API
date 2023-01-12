import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";
import { AppError } from "../../errors";
import {
  ICreateAuthorRequest,
  ICreateAuthorResponse,
} from "../../interfaces/author.interface";
import { createAuthorReturnSchema } from "../../schemas/author";

const createAuthorService = async (
  payload: ICreateAuthorRequest
): Promise<ICreateAuthorResponse | Error> => {
  const authorRepo = AppDataSource.getRepository(Author);

  if (await authorRepo.findOne({ where: { email: payload.email } })) {
    throw new AppError("Author already exists", 409);
  }

  const author = authorRepo.create(payload);
  await authorRepo.save(author);

  const authorWithoutPassword = await createAuthorReturnSchema.validate(
    author,
    {
      stripUnknown: true,
    }
  );

  return authorWithoutPassword;
};

export default createAuthorService;
