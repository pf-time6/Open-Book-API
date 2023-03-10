import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";
import { AppError } from "../../errors";
import { IDeleteAuthorResponse } from "../../interfaces/author.interface";
import updateAuthorReturnSchema from "../../schemas/author/updateAuthorReturn.schema";

const restoreAuthorService = async (
  userId: string
): Promise<IDeleteAuthorResponse> => {
  const authorRepo = AppDataSource.getRepository(Author);

  const author = await authorRepo
    .createQueryBuilder("author")
    .withDeleted()
    .where("author.id = :id", { id: userId })
    .getOne();

  if (!author) {
    throw new AppError("Author not found", 404);
  }

  if (author.isActive === false) {
    await authorRepo
      .createQueryBuilder("author")
      .restore()
      .where("id = :id", { id: userId })
      .execute();

    await authorRepo
      .createQueryBuilder("author")
      .update()
      .set({ isActive: true })
      .where("id = :id", { id: userId })
      .execute();

    const author = await authorRepo.findOneBy({ id: userId });

    const authorWithoutPassword = await updateAuthorReturnSchema.validate(
      author,
      {
        stripUnknown: true,
      }
    );

    return { restored: authorWithoutPassword };
  }

  throw new AppError("Author is already actived", 400);
};

export default restoreAuthorService;
