import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";
import { IAuthorUpdateRequest, IUpdateAuthorResponse } from "../../interfaces";
import updateAuthorReturnSchema from "../../schemas/author/updateAuthorReturn.schema";

const updateAuthorService = async (
  payload: IAuthorUpdateRequest,
  userId: string
): Promise<IUpdateAuthorResponse> => {
  const authorRepo = AppDataSource.getRepository(Author);
  const author = await authorRepo.findOneBy({ id: userId });

  const updateAuthor = authorRepo.create({ ...author, ...payload });
  await authorRepo.save(updateAuthor);

  const authorWithoutPassword = await updateAuthorReturnSchema.validate(
    updateAuthor,
    {
      stripUnknown: true,
    }
  );

  return authorWithoutPassword;
};

export default updateAuthorService;
