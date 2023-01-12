import AppDataSource from "../../data-source";
import Books from "../../entities/books.entity";
import { listBooksResponseSchema } from "../../schemas/books";

const listBooksService = async () => {
  const booksRepo = AppDataSource.getRepository(Books);

  const books = await booksRepo.find({
    relations: {
      author: true,
    },
  });

  const booksResponse = await listBooksResponseSchema.validate(books, {
    stripUnknown: true,
  });

  return booksResponse;
};

export default listBooksService;
