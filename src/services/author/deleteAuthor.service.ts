import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";
import updateAuthorService from "./updateAuthor.service";

const deleteAuthorService = async (userId: string) => {
  const authorRepo = AppDataSource.getRepository(Author);

  const author = await authorRepo
    .createQueryBuilder("author")
    .withDeleted()
    .where("author.id = :id", { id: userId })
    .getOne();

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

    return { restored: author };
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

  return { deleted: addSoftDelete };
};

export default deleteAuthorService;
