import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Books from "../../../entities/books.entity";
import {
  mockedAdminAuthorSession,
  mockedBooksRequest,
  mockedPagesBooksRequest,
} from "../../mocks";
import Author from "../../../entities/author.entity";
import jwt_decode from "jwt-decode";
import { IDecodedToken } from "../../../interfaces";

describe("Create book pages route", () => {
  let baseUrl: string = "/books";
  let conn: DataSource;
  let booksRepo: Repository<Books>;
  let authorRepo: Repository<Author>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((dataSource) => {
        conn = dataSource;
        booksRepo = conn.getRepository(Books);
        authorRepo = conn.getRepository(Author);
      })
      .catch((err) => console.log(err));
  });

  beforeEach(async () => {
    const books = await booksRepo.find();
    await booksRepo.remove(books);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  // it("POST: /books/:id -> Should be able to create book pages", async () => {
  //   const { authorPayload, sessionPayload } = mockedAdminAuthorSession;
  //   await request(app).post("/author").send(authorPayload);

  //   const authorLogged = await request(app).post("/login").send(sessionPayload);
  //   const token = authorLogged.body.token;

  //   await request(app)
  //     .post(baseUrl)
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(mockedBooksRequest);

  //   const booksFound = await request(app).get(baseUrl);

  //   const response = await request(app)
  //     .post(`${baseUrl}/${booksFound.body[0].id}`)
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(mockedPagesBooksRequest);

  //   const pagesBookResponse = {
  //     status: 201,
  //     bodyToEqual1: expect.objectContaining(mockedPagesBooksRequest),
  //     bodyToEqual2: expect.objectContaining({
  //       book: expect.any(String),
  //     }),
  //   };

  //   expect(response.status).toBe(pagesBookResponse.status);
  //   expect(response.body).toStrictEqual(pagesBookResponse.bodyToEqual1);
  //   expect(response.body).toStrictEqual(pagesBookResponse.bodyToEqual2);
  // });

  // it("POST: /books/:id -> Should not be able to create book pages | Missing token", async () => {
  //   const { sessionPayload } = mockedAdminAuthorSession;
  //   const authorLogged = await request(app).post("/login").send(sessionPayload);
  //   const token = authorLogged.body.token;

  //   await request(app)
  //     .post(baseUrl)
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(mockedBooksRequest);

  //   const books = await request(app).get(baseUrl);

  //   const response = await request(app)
  //     .post(`${baseUrl}/${books.body[0].id}`)
  //     .send(mockedPagesBooksRequest);

  //   const pagesBookResponse = {
  //     status: 401,
  //     bodyHaveProperty: "message",
  //     bodyStrictEqual: expect.objectContaining({
  //       message: "Missing or invalid token",
  //     }),
  //   };

  //   expect(response.status).toBe(pagesBookResponse.status);
  //   expect(response.body).toHaveProperty(pagesBookResponse.bodyHaveProperty);
  //   expect(response.body).toStrictEqual(pagesBookResponse.bodyStrictEqual);
  // });

  // it("POST: /books/:id -> Should not be able to create book pages | Invalid body", async () => {
  //   const { sessionPayload } = mockedAdminAuthorSession;

  //   const authorLogged = await request(app).post("/login").send(sessionPayload);
  //   const token = authorLogged.body.token;

  //   await request(app)
  //     .post(baseUrl)
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(mockedBooksRequest);

  //   const books = await request(app).get(baseUrl);

  //   const response = await request(app)
  //     .post(`${baseUrl}/${books.body[0].id}`)
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(mockedPagesBooksRequest);

  //   const pagesBookResponse = {
  //     status: 400,
  //     bodyHaveProperty: "message",
  //     bodyStrictEqual: expect.objectContaining({
  //       message: expect.arrayContaining([
  //         "page is a required field",
  //         "chapter is a required field",
  //         "isChapter is a required field",
  //         "chapterTitle is a required field",
  //         "content is a required field",
  //       ]),
  //     }),
  //   };

  //   expect(response.status).toBe(pagesBookResponse.status);
  //   expect(response.body).toHaveProperty(pagesBookResponse.bodyHaveProperty);
  //   expect(response.body).toStrictEqual(pagesBookResponse.bodyStrictEqual);
  // });

  // it("POST: /books/:id -> Should not be able to create book pages | Invalid book", async () => {
  //   const { sessionPayload } = mockedAdminAuthorSession;
  //   const authorLogged = await request(app).post("/login").send(sessionPayload);
  //   const token = authorLogged.body.token;

  //   const response = await request(app)
  //     .post(`${baseUrl}/12c1i2ij`)
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(mockedPagesBooksRequest);

  //   const pagesBookResponse = {
  //     status: 404,
  //     bodyHaveProperty: "message",
  //     bodyStrictEqual: expect.objectContaining({
  //       message: "Book not found",
  //     }),
  //   };

  //   expect(response.status).toBe(pagesBookResponse.status);
  //   expect(response.body).toHaveProperty(pagesBookResponse.bodyHaveProperty);
  //   expect(response.body).toStrictEqual(pagesBookResponse.bodyStrictEqual);
  // });

  // it("POST: /books/:id -> Should not be able to create book pages | Book does not belong to the logged in author", async () => {
  //   const { sessionPayload } = mockedAdminAuthorSession;
  //   const authorLogged = await request(app).post("/login").send(sessionPayload);
  //   const token = authorLogged.body.token;

  //   await request(app)
  //     .post(baseUrl)
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(mockedBooksRequest);

  //   const books = await request(app).get(baseUrl);

  //   const response = await request(app)
  //     .post(`${baseUrl}/${books.body[0].id}`)
  //     .set("Authorization", `Bearer ${token}`)
  //     .send(mockedPagesBooksRequest);

    // console.log(response);

    // const pagesBookResponse = {
    //   status: 403,
    //   bodyHaveProperty: "message",
    //   bodyStrictEqual: expect.objectContaining({
    //     message: "Unauthorized book access",
    //   }),
    // };

    // expect(response.status).toBe(pagesBookResponse.status);
    // expect(response.body).toHaveProperty(pagesBookResponse.bodyHaveProperty);
    // expect(response.body).toStrictEqual(pagesBookResponse.bodyStrictEqual);
  // });
});
