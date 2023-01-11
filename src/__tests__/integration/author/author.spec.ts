import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Author from "../../../entities/author.entity";

//mocks
import { mockedCommonAuthorRequest, mockedAdminAuthorRequest } from "../../mocks";

describe("Author route", () => {
  let baseUrl: string = "/author";
  let conn: DataSource;
  let authorRepo: Repository<Author>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((dataSource) => {
        conn = dataSource;
        authorRepo = conn.getRepository(Author);
      })
      .catch((err) => console.error(err));
  });

  beforeEach(async () => {
    const authors = await authorRepo.find();
    await authorRepo.remove(authors);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("Should be possible create an Author", async () => {
    const authorPayload = mockedCommonAuthorRequest;

    const response = await request(app).post(baseUrl).send(authorPayload);

    const routeResponse = {
      status: 201,
      bodyStrictEqual: expect.objectContaining({
        id: expect.any(String),
        email: expect.any(String),
        name: expect.any(String),
        city: expect.any(String),
        country: expect.any(String),
        isAdm: expect.any(Boolean),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
      bodyNotHaveProperty: "password",
    };

    expect(response.status).toBe(routeResponse.status);
    expect(response.body).not.toHaveProperty(routeResponse.bodyNotHaveProperty);
    expect(response.body).toStrictEqual(routeResponse.bodyStrictEqual);
  });

  it("Should be not allowed create a existing Author", async () => {
    const authorPayload = mockedCommonAuthorRequest;
    const author = authorRepo.create({ ...authorPayload });
    await authorRepo.save(author);

    const response = await request(app).post(baseUrl).send(authorPayload);

    const expectResults = {
      status: 409,
      bodyHaveProperty: "message",
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyHaveProperty);
  });

  it("Should be possible create adm Author", async () => {
    const admAuthorPayload = mockedAdminAuthorRequest;

    const response = await request(app).post(baseUrl).send(admAuthorPayload);

    const expectResults = {
      status: 201,
      bodyHaveProperty: "isAdm",
      bodyStrictEqual: expect.objectContaining({
        id: expect.any(String),
        email: expect.any(String),
        name: expect.any(String),
        city: expect.any(String),
        country: expect.any(String),
        isAdm: expect.any(Boolean),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
      bodyNotHaveProperty: "password",
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).not.toHaveProperty(expectResults.bodyNotHaveProperty);
    expect(response.body).toStrictEqual(expectResults.bodyStrictEqual);
    expect(response.body.isAdm).toEqual(true);
  });
});
