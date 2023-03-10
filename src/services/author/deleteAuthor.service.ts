import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";
import { AppError } from "../../errors";
import { IDeleteAuthorResponse } from "../../interfaces/author.interface";
import updateAuthorReturnSchema from "../../schemas/author/updateAuthorReturn.schema";

const deleteAuthorService = async (
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
    throw new AppError("Author is already deleted", 400);
  }

  await authorRepo
    .createQueryBuilder("author")
    .update()
    .set({ isActive: false })
    .where("id = :id", { id: userId })
    .execute();

  await authorRepo
    .createQueryBuilder("author")
    .softDelete()
    .where("id = :id", { id: userId })
    .execute();

  const addSoftDelete = await authorRepo
    .createQueryBuilder("author")
    .withDeleted()
    .where("author.id = :id", { id: userId })
    .getOne();

  const authorWithoutPassword = await updateAuthorReturnSchema.validate(
    addSoftDelete,
    {
      stripUnknown: true,
    }
  );
  return { deleted: authorWithoutPassword };
};

export default deleteAuthorService;
