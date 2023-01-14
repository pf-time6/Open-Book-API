import { Any, In } from "typeorm";

import AppDataSource from "../../data-source";
import Author from "../../entities/author.entity";
import Books from "../../entities/books.entity";
import Categories from "../../entities/categories.entity";
import Books_Categories from "../../entities/books_categories.entity";
import createBooksResponseSchema from "../../schemas/books/createBookResponse.schema";
import { AppError } from "../../errors";
import {
  ICreateBookRequest,
  ICreateBookResponse,
} from "../../interfaces/books.interface";

const createBookService = async (
  body: ICreateBookRequest,
  userId: string
): Promise<ICreateBookResponse> => {
  const booksRepo = AppDataSource.getRepository(Books);
  const bookFound = await booksRepo.findOne({
    where: {
      title: body.title,
    },
  });

  if (bookFound) {
    throw new AppError("Tittle already exists", 409);
  }

  const authorRepo = AppDataSource.getRepository(Author);
  const authorFound = await authorRepo.findOne({
    where: {
      id: userId,
    },
  });

  if (!authorFound) {
    throw new AppError("Author not found", 409);
  }

  const books = booksRepo.create({
    ...body,
    author: authorFound,
  });

  const categoriesRepo = AppDataSource.getRepository(Categories);
  const bcRepo = AppDataSource.getRepository(Books_Categories);

  const loopCategories = await categoriesRepo.findBy({
    id: In([...body.category]),
  });

  if (loopCategories.length !== body.category.length) {
    throw new AppError(
      `There is at least one category that is not in the database.`,
      404
    );
  }

  await booksRepo.save(books);

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

  const authorWithoutPassword = await createBooksResponseSchema.validate(
    { ...books, category: body.category },
    {
      stripUnknown: true,
    }
  );

  return authorWithoutPassword;
};

export default createBookService;
