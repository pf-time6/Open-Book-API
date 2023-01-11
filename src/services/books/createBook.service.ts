import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";
import Books from "../../entities/books.entity";
import Categories from "../../entities/categories.entity";
import Books_Categories from "../../entities/books_categories.entity";
import createBooksResponseSchema from "../../schemas/books/createBookResponse.schema";
import { AppError } from "../../errors";
import { ICreateBookRequest } from "../../interfaces/books.interface";

const createBookService = async (body: ICreateBookRequest, userId: string) => {
  const booksRepo = AppDataSource.getRepository(Books);
  const bookFound = await booksRepo.findOne({
    where: {
      title: body.title,
    },
  });

  if (bookFound) {
    throw new AppError("Book title already registered into the system.", 409);
  }

  const authorRepo = AppDataSource.getRepository(Author);
  const authorFound = await authorRepo.findOne({
    where: {
      id: userId,
    },
  });

  if (!authorFound) {
    throw new AppError("Author not found.", 404);
  }

  const books = booksRepo.create({
    ...body,
    author: authorFound,
  });
  await booksRepo.save(books);

  const categoriesRepo = AppDataSource.getRepository(Categories);
  const bcRepo = AppDataSource.getRepository(Books_Categories);

  body.category.map(async (el) => {
    const categories = await categoriesRepo.findOneBy({
      id: el,
    });

    if (!categories) {
      return;
    }

    const books_categories = bcRepo.create({
      books,
      categories,
    });
    await bcRepo.save(books_categories);
  });

  const booksResponse = await createBooksResponseSchema.validate(
    { ...books, category: body.category },
    {
      stripUnknown: true,
    }
  );

  return booksResponse;
};

export default createBookService;