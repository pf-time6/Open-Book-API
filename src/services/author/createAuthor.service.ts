import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";
import { AppError } from "../../errors";
import {
  ICreateAuthorRequest,
  ICreateAuthorResponse,
} from "../../interfaces/author.interface";

const createAuthorService = async (
  payload: ICreateAuthorRequest
): Promise<ICreateAuthorResponse | Error> => {
  const authorRepo = AppDataSource.getRepository(Author);

  if (await authorRepo.findOne({ where: { email: payload.email } })) {
    return new AppError("Author already exists", 409);
  }

  const author = authorRepo.create(payload);
  await authorRepo.save(author);

  // const userWithoutPassword = await createUserReturnSchema.validate(user, {
  //   stripUnknown: true,
  // });

  // return userWithoutPassword;
};

export default createAuthorService;
