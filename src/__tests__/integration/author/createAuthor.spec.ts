import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Author from "../../../entities/author.entity";

//mocks
import {
  mockedCommonAuthorRequest,
  mockedAdminAuthorRequest,
  mockedCommonAuthorInvalidBodyRequest,
} from "../../mocks";

describe("Create Author Tests", () => {
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

  afterAll(async () => {
    await conn.destroy();
  });
  
  beforeEach(async () => {
    const authors = await authorRepo.find();
    await authorRepo.remove(authors);
  });
  
  it("POST: /author -> Should be able to create an Author", async () => {
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
        isActive: expect.any(Boolean),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
      bodyNotHaveProperty: "password",
    };

    expect(response.status).toBe(routeResponse.status);
    expect(response.body).not.toHaveProperty(routeResponse.bodyNotHaveProperty);
    expect(response.body).toStrictEqual(routeResponse.bodyStrictEqual);
  });

  it("POST: /author -> Should be not allowed create a existing Author", async () => {
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

  it("POST: /author -> Should not be able to create an Author with invalid body", async () => {
    const invalidBody = mockedCommonAuthorInvalidBodyRequest;
    const response = await request(app).post(baseUrl).send(invalidBody);

    const expectResults = {
      status: 400,
      bodyToHaveProperty: "message",
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyToHaveProperty);
    expect(response.body.isActive).not.toBe(false)
  });

  it("POST: /author -> Should be able to create adm Author", async () => {
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
        isActive: expect.any(Boolean),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
      bodyNotHaveProperty: "password",
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyStrictEqual);
    expect(response.body.isAdm).toBe(true);
    expect(response.body).not.toHaveProperty(expectResults.bodyNotHaveProperty);
  });
});
