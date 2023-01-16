import AppDataSource from "../../data-source";
import {
  ICreatePageRequest,
  ICreatePageResponse,
} from "../../interfaces/pages.interface";
import Pages from "../../entities/pages.entity";
import Books from "../../entities/books.entity";
import createPageResponseSchema from "../../schemas/pages/createPageResponse.shema";

const createPagesService = async (
  body: ICreatePageRequest,
  bookId: string
): Promise<ICreatePageResponse> => {
  const booksRepo = AppDataSource.getRepository(Books);
  const bookFound = await booksRepo.findOne({
    where: {
      id: bookId,
    },
  });
  const pagesData = {
    ...body,
    books: bookFound,
  };

  const pagesRepo = AppDataSource.getRepository(Pages);
  const pages = pagesRepo.create(pagesData);
  await pagesRepo.save(pages);

  const pageResponse = await createPageResponseSchema.validate(pages, {
    stripUnknown: true,
  });

  return pageResponse;
};

export default createPagesService;
