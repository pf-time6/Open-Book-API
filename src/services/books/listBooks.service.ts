import AppDataSource from "../../data-source";
import Books from "../../entities/books.entity";
import { AppError } from "../../errors";
import {
  iBooksData,
  IListBooksResponse,
} from "../../interfaces/books.interface";
import { listBooksResponseSchema } from "../../schemas/books";
import { ListBooksMapper } from "./mapper/listBooks.mapper";

const listBooksService = async (): Promise<IListBooksResponse[]> => {
  const booksRepo = AppDataSource.getRepository(Books);

  const books = await booksRepo
    .createQueryBuilder("books")
    .leftJoinAndSelect("books.books_categories", "books_categories")
    .leftJoinAndSelect("books_categories.categories", "categories")
    .leftJoinAndSelect("books.author", "author")
    .getMany();

  if (books.length === 0) {
    throw new AppError("There are no books found", 404);
  }

  const listBooks = books.map((el: iBooksData) => {
    return ListBooksMapper.func(el);
  });

  const booksResponse = await listBooksResponseSchema.validate(listBooks, {
    stripUnknown: true,
  });

  return booksResponse;
};

export default listBooksService;
