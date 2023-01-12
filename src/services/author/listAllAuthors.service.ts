import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";
import { IAuthorWithBooksResponse } from "../../interfaces/author.interface";
import { authorArrayReturnSchema } from "../../schemas/author";

const listAllAuthorsService = async (): Promise<IAuthorWithBooksResponse[]> => {
  const authorRepo = AppDataSource.getRepository(Author);

  const authorWithBooks = await authorRepo
    .createQueryBuilder("author")
    .leftJoinAndSelect("author.books", "books")
    .getMany();

  const authorWithoutPassword = await authorArrayReturnSchema.validate(
    authorWithBooks,
    {
      stripUnknown: true,
    }
  );

  return authorWithoutPassword;
};

export default listAllAuthorsService;
