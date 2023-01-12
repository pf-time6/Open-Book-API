import AppDataSource from "../../data-source";
import { ICreatePageRequest } from "../../interfaces/pages.interface";
import Pages from "../../entities/pages.entity";

const createPagesService = async (body: ICreatePageRequest, bookId: string) => {

  const pagesData = {
    book:bookId,
    ...body
  }

  const pagesRepo = AppDataSource.getRepository(Pages);
  const pages = pagesRepo.create(pagesData);
  await pagesRepo.save(pages);

  return {book:bookId,...pages}
};

export default createPagesService;
