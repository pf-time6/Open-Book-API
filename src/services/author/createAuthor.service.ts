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
  const author = await authorRepo
    .createQueryBuilder("author")
    .withDeleted()
    .leftJoinAndSelect("author.books", "books")
    .where("author.email = :email", { email: payload.email })
    .getOne();

  if (author) {
    throw new AppError("Email already registered to another author", 409);
  }

  const authorCreate = authorRepo.create(payload);
  await authorRepo.save(authorCreate);

  const authorWithoutPassword = await createAuthorReturnSchema.validate(
    authorCreate,
    {
      stripUnknown: true,
    }
  );

  return authorWithoutPassword;
};

export default createAuthorService;
