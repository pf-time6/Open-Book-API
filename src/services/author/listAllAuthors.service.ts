import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";
import { ICreateAuthorResponse } from "../../interfaces/author.interface";
import {
  authorArrayReturnSchema,
  createAuthorReturnSchema,
} from "../../schemas/author";

const listAllAuthorsService = async (): Promise<ICreateAuthorResponse[]> => {
  const authorRepo = AppDataSource.getRepository(Author);
  const authors = await authorRepo.find();

  const authorWithoutPassword = await authorArrayReturnSchema.validate(
    authors,
    {
      stripUnknown: true,
    }
  );

  return authorWithoutPassword;
};

export default listAllAuthorsService;
