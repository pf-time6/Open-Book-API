import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";
import { AppError } from "../../errors";
import { IAuthorWithBooksResponse } from "../../interfaces";
import { authorObjectReturnSchema } from "../../schemas/author";

const getAuthorService = async (
  authorId: string
): Promise<IAuthorWithBooksResponse> => {
  const authorRepo = AppDataSource.getRepository(Author);

  const author = await authorRepo
    .createQueryBuilder("author")
    .leftJoinAndSelect("author.books", "books")
    .where("author.id = :id", { id: authorId })
    .getOne();

  if (!author) {
    throw new AppError("Author not found", 404);
  }

  const authorWithoutPassword = await authorObjectReturnSchema.validate(
    author,
    {
      stripUnknown: true,
    }
  );

  return authorWithoutPassword;
};

export default getAuthorService;
