import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Books from "../../../entities/books.entity";
import { mockednBooksRequest } from "../../mocks";

describe("Books route", () => {
  let baseUrl: string = "/books";
  let conn: DataSource;
  let booksRepo: Repository<Books>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((dataSource) => {
        conn = dataSource;
        booksRepo = conn.getRepository(Books);
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

  it("Should be able to create books", async () => {
    const response = await request(app).post(baseUrl).send(mockednBooksRequest);

    const booksResponse = {
      status: 201,
      bodyToEqual1: expect.objectContaining(mockednBooksRequest),
      bodyToEqual2: expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(String),
      }),
    };

    expect(response.status).toBe(booksResponse.status);
    expect(response.body).toStrictEqual(booksResponse.bodyToEqual1);
    expect(response.body).toStrictEqual(booksResponse.bodyToEqual2);
  });

  it("Should not be able to create books | Invalid body", async () => {
    const response = await request(app).post(baseUrl).send(mockednBooksRequest);

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

  it("Should not be able to create books | Title already exists", async () => {
    await booksRepo.save({ ...mockednBooksRequest });

    const response = await request(app).post(baseUrl).send(mockednBooksRequest);

    const booksResponse = {
      status: 409,
      bodyHaveProperty: "message",
      bodyStrictEqual: expect.objectContaining({
        message: "Title already registered in the system",
      }),
    };

    expect(response.status).toBe(booksResponse.status);
    expect(response.body).toHaveProperty(booksResponse.bodyHaveProperty);
    expect(response.body).toStrictEqual(booksResponse.bodyStrictEqual);
  });
});
