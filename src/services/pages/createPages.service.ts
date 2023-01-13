import AppDataSource from "../../data-source";
import { ICreatePageRequest } from "../../interfaces/pages.interface";
import Pages from "../../entities/pages.entity";
import Books from "../../entities/books.entity";

const createPagesService = async (body: ICreatePageRequest, bookId: string) => {

  const booksRepo = AppDataSource.getRepository(Books)
  const bookFound = await booksRepo.findOne({
    where: {
      id: bookId,
    },
  });
  const pagesData = {
    ...body,
    books: bookFound
  }

  const pagesRepo = AppDataSource.getRepository(Pages);
  const pages = pagesRepo.create(pagesData);
  await pagesRepo.save(pages);

  return pages
};

export default createPagesService;
