import { response } from "express";
import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Books from "../../../entities/books.entity";
import Books_Categories from "../../../entities/books_categories.entity";
import Categories from "../../../entities/categories.entity";
import {
  mockedAdminAuthorSession,
  mockedBooksRequest,
  mockedBooksUpdateRequest,
  mockedCategoryRequest,
  mockedCategoryRequest2,
  mockedListBooks,
} from "../../mocks";

describe("List books route", () => {
  let baseUrl: string = "/books";
  let conn: DataSource;
  let booksRepo: Repository<Books>;
  let books_categoriesRepo: Repository<Books_Categories>;
  let categoriesRepo: Repository<Categories>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((dataSource) => {
        conn = dataSource;
        booksRepo = conn.getRepository(Books);
        books_categoriesRepo = conn.getRepository(Books_Categories);
        categoriesRepo = conn.getRepository(Categories);
      })
      .catch((err) => console.log(err));
  });

  beforeEach(async () => {
    const books_categories = await books_categoriesRepo.find();
    const books = await booksRepo.find();
    await books_categoriesRepo.remove(books_categories);
    await booksRepo.remove(books);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("PATCH: /author/:id -> Should be able to update a book's data", async () => {
    const { authorPayload, sessionPayload } = mockedAdminAuthorSession;
    await request(app).post("/author").send(authorPayload);
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedCategoryRequest);

      await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedCategoryRequest2);

    const book = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksRequest);

    const response = await request(app)
      .patch(`${baseUrl}/${book.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksUpdateRequest);

    const books = await booksRepo.find();

    console.log(books)
    console.log(response.body)

    // const expectResults = {
    //   status: 201,
    //   bodyToEqual: {
    //     id: expect.any(String),
    //     name: expect.any(String),
    //     email: expect.any(String),
    //     city: city,
    //     country: expect.any(String),
    //     isAdm: expect.any(Boolean),
    //     isActive: expect.any(Boolean),
    //     createdAt: expect.any(String),
    //     updatedAt: expect.any(String),
    //     deletedAt: null,
    //   },
    // };

    // expect(response.status).toBe(expectResults.status);
    // expect(response.body).toStrictEqual(expectResults.bodyToEqual);
  });
});
