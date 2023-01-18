import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Books from "../../../entities/books.entity";
import Books_Categories from "../../../entities/books_categories.entity";
import {
  mockedAdminAuthorSession,
  mockedBooksRequest,
  mockedBooksUpdateRequest,
  mockedCategoryRequest,
  mockedCategoryRequest2,
  mockedCommonAuthorSession,
  mockedInvalidBodyBooks,
} from "../../mocks";

describe("List books route", () => {
  let baseUrl: string = "/books";
  let conn: DataSource;
  let booksRepo: Repository<Books>;
  let books_categoriesRepo: Repository<Books_Categories>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(async (dataSource) => {
        conn = dataSource;
        booksRepo = conn.getRepository(Books);
        books_categoriesRepo = conn.getRepository(Books_Categories);

        const { authorPayload } = mockedAdminAuthorSession;
        await request(app).post("/author").send(authorPayload);

        const { authorPayload: authorPayload2 } = mockedCommonAuthorSession;
        await request(app).post("/author").send(authorPayload2);
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

  it("PATCH: /books/:id -> Should be able to update a book's data", async () => {
    const { sessionPayload } = mockedAdminAuthorSession;
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

    const expectResults = {
      status: 200,
      bodyStrictEqual: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          about: mockedBooksUpdateRequest.about,
          coverUrl: mockedBooksUpdateRequest.coverUrl,
          createdAt: expect.any(String),
          books_categories: expect.arrayContaining([expect.any(Object)]),
        }),
      ]),
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyStrictEqual);
  });

  it("PATCH: /books/:id -> Should not be able to update a book's data | Missing or invalid token", async () => {
    const { sessionPayload } = mockedAdminAuthorSession;
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    const book = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksRequest);

    const response = await request(app)
      .patch(`${baseUrl}/${book.body.id}`)
      .send(mockedBooksUpdateRequest);

    const expectResults = {
      status: 401,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "Missing or invalid token",
      }),
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyHaveProperty);
    expect(response.body).toStrictEqual(expectResults.bodyStrictEqual);
  });

  it("PATCH: /books/:id -> Should not be able to update a book's data | Invalid body", async () => {
    const { sessionPayload } = mockedAdminAuthorSession;
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    const book = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksRequest);

    const response = await request(app)
      .patch(`${baseUrl}/${book.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedInvalidBodyBooks);

    const expectResults = {
      status: 400,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "Body is empty",
      }),
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyHaveProperty);
    expect(response.body).toStrictEqual(expectResults.bodyStrictEqual);
  });

  it("PATCH: /books/:id -> Should not be able to update a book's data | Book not found", async () => {
    const { sessionPayload } = mockedAdminAuthorSession;
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    const response = await request(app)
      .patch(`${baseUrl}/123`)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedInvalidBodyBooks);

    const expectResults = {
      status: 404,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "Book not found",
      }),
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyHaveProperty);
    expect(response.body).toStrictEqual(expectResults.bodyStrictEqual);
  });

  it("PATCH: /books/:id -> Should not be able to update a book's data | Book does not belong to the author", async () => {
    const { sessionPayload } = mockedAdminAuthorSession;
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    const { sessionPayload: sessionPayload2 } = mockedCommonAuthorSession;
    const authorLogged2 = await request(app)
      .post("/login")
      .send(sessionPayload2);
    const token2 = authorLogged2.body.token;

    const book = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksRequest);

    const response = await request(app)
      .patch(`${baseUrl}/${book.body.id}`)
      .set("Authorization", `Bearer ${token2}`)
      .send(mockedBooksUpdateRequest);

    const expectResults = {
      status: 403,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "Unauthorized book access.",
      }),
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyHaveProperty);
    expect(response.body).toStrictEqual(expectResults.bodyStrictEqual);
  });
});
