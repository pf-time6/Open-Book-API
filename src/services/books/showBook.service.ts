import AppDataSource from "../../data-source";
import Books from "../../entities/books.entity";
import { showBookResponseSchema } from "../../schemas/books";

const showBookService = async (bookId) => {
  const booksRepo = AppDataSource.getRepository(Books);

  const books = await booksRepo.findOne({
    where: {id:bookId},
    relations: {
      author: true,
      pages: true
    },
  });

  const booksResponse = await showBookResponseSchema.validate(books, {
    stripUnknown: true,
  });

  //return booksResponse;
  return books;
};

export default showBookService;
