import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Books from "../../../entities/books.entity";
import Books_Categories from "../../../entities/books_categories.entity";
import {
  mockedAdminAuthorSession,
  mockedBooksRequest,
  mockedCategoryRequest,
  mockedInvalidBodyBooks,
} from "../../mocks";

describe("Create books route", () => {
  let baseUrl: string = "/books";
  let conn: DataSource;
  let booksRepo: Repository<Books>;
  let book_categoryRepo: Repository<Books_Categories>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((dataSource) => {
        conn = dataSource;
        booksRepo = conn.getRepository(Books);
        book_categoryRepo = conn.getRepository(Books_Categories);
      })
      .catch((err) => console.log(err));
  });

  beforeEach(async () => {
    const books_category = await book_categoryRepo.find();
    await book_categoryRepo.remove(books_category);
    const books = await booksRepo.find();
    await booksRepo.remove(books);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("POST: /books -> Should be able to create books", async () => {
    const { authorPayload, sessionPayload } = mockedAdminAuthorSession;
    await request(app).post("/author").send(authorPayload);
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedCategoryRequest);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksRequest);

    const booksResponse = {
      status: 201,
      bodyToEqual1: expect.objectContaining({
        ...mockedBooksRequest,
        id: expect.any(String),
        createdAt: expect.any(String),
      }),
    };

    expect(response.status).toBe(booksResponse.status);
    expect(response.body).toStrictEqual(booksResponse.bodyToEqual1);
  });

  it("POST: /books -> Should not be able to create books | Missing Token", async () => {
    const response = await request(app).post(baseUrl).send(mockedBooksRequest);

    const booksResponse = {
      status: 401,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "Missing or invalid token",
      }),
    };

    expect(response.status).toBe(booksResponse.status);
    expect(response.body).toHaveProperty(booksResponse.bodyHaveProperty);
    expect(response.body).toStrictEqual(booksResponse.bodyStrictEqual);
  });

  it("POST: /books -> Should not be able to create books | Invalid body", async () => {
    const { sessionPayload } = mockedAdminAuthorSession;
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedInvalidBodyBooks);

    const booksResponse = {
      status: 400,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: expect.arrayContaining([
          "title is a required field",
          "category is a required field",
          "about is a required field",
          "coverUrl is a required field",
        ]),
      }),
    };

    expect(response.status).toBe(booksResponse.status);
    expect(response.body).toHaveProperty(booksResponse.bodyHaveProperty);
    expect(response.body).toStrictEqual(booksResponse.bodyStrictEqual);
  });

  it("POST: /books -> Should not be able to create books | Title already exists", async () => {
    const { sessionPayload } = mockedAdminAuthorSession;
    const authorLogged = await request(app).post("/login").send(sessionPayload);
    const token = authorLogged.body.token;

    await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksRequest);

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedBooksRequest);

    const booksResponse = {
      status: 409,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "Title already exists",
      }),
    };

    expect(response.status).toBe(booksResponse.status);
    expect(response.body).toHaveProperty(booksResponse.bodyHaveProperty);
    expect(response.body).toStrictEqual(booksResponse.bodyStrictEqual);
  });
});
