import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";
import { AppError } from "../../errors";
import { ICreateAuthorResponse } from "../../interfaces/author.interface";
import { createAuthorReturnSchema } from "../../schemas/author";

const getAuthorService = async (
  authorId: string
): Promise<ICreateAuthorResponse> => {
  const authorRepo = AppDataSource.getRepository(Author);
  const author = await authorRepo.findOneBy({ id: authorId });

  if (!author) {
    throw new AppError("Author not found", 404);
  }

  const authorWithoutPassword = await createAuthorReturnSchema.validate(
    author,
    {
      stripUnknown: true,
    }
  );

  return authorWithoutPassword;
};

export default getAuthorService;
