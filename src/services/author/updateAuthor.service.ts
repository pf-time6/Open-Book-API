import { hash, hashSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";
import { IAuthorUpdateRequest } from "../../interfaces";

const updateAuthorService = async (
  payload: IAuthorUpdateRequest,
  userId: string
) => {
  const authorRepo = AppDataSource.getRepository(Author);
  const author = await authorRepo.findOneBy({ id: userId });

  const updateAuthor = authorRepo.create({ ...author, ...payload });
  await authorRepo.save(updateAuthor);

  return updateAuthor;
};

export default updateAuthorService;
