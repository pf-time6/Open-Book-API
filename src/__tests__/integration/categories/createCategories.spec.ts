import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Author from "../../../entities/author.entity";
import Categories from "../../../entities/categories.entity";
import {
  mockedAdminAuthorRequest,
  mockedAdminAuthorSession,
  mockedCommonAuthorRequest,
  mockedCommonAuthorSession,
} from "../../mocks";

describe("Create cateogires tests", () => {
  let baseUrl: string = "/categories";
  let conn: DataSource;
  let authorRepo: Repository<Author>;
  let categoriesRepo: Repository<Categories>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((datasource) => {
        conn = datasource;
        categoriesRepo = conn.getRepository(Categories);
        authorRepo = conn.getRepository(Author);
      })
      .catch((err) => console.error(err));
  });

  afterAll(async () => {
    const authors = await authorRepo.find();
    await authorRepo.remove(authors);
    await conn.destroy();
  });

  beforeEach(async () => {
    const categories = await categoriesRepo.find();
    await categoriesRepo.remove(categories);
  });

  it("POST: /categories -> Should be able to create a category", async () => {
    const adminAuthorPayload = mockedAdminAuthorRequest;
    const createAdminAuthor = await request(app)
      .post("/author")
      .send(adminAuthorPayload);

    expect(createAdminAuthor.status).toBe(201);

    const loginPayload = mockedAdminAuthorSession.sessionPayload;
    const login = await request(app).post("/login").send(loginPayload);

    expect(login.status).toBe(200);
    expect(login.body).toHaveProperty("token");

    const token: string = login.body.token;

    const newValues = {
      name: "Ficção",
    };

    const expectValues = {
      status: 201,
      bodyToEqual: expect.objectContaining({
        id: expect.any(Number),
        name: newValues.name,
      }),
    };

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(newValues);

    expect(response.status).toBe(expectValues.status);
    expect(response.body).toStrictEqual(expectValues.bodyToEqual);
  });

  it("POST: /categories -> Should not be able to create a category withoud admin token", async () => {
    const commonAuthorPayload = mockedCommonAuthorRequest;

    const createCommonAuthor = await request(app)
      .post("/author")
      .send(commonAuthorPayload);

    expect(createCommonAuthor.status).toBe(201);

    const loginPayload = mockedCommonAuthorSession.sessionPayload;
    const login = await request(app).post("/login").send(loginPayload);

    expect(login.status).toBe(200);
    expect(login.body).toHaveProperty("token");

    const token: string = login.body.token;

    const newValues = {
      name: "Ação",
    };

    const expectValues = {
      status: 403,
      bodyHaveProperty: "message",
    };

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(newValues);

    expect(response.status).toBe(expectValues.status);
    expect(response.body).toHaveProperty(expectValues.bodyHaveProperty);
  });

  it("POST: /categories -> Should not be able to create a category with invalid data", async () => {
    const loginPayload = mockedAdminAuthorSession.sessionPayload;
    const login = await request(app).post("/login").send(loginPayload);

    expect(login.status).toBe(200);
    expect(login.body).toHaveProperty("token");

    const token: string = login.body.token;

    const newValues = {
      id: 8392,
      email: "any@mail.com",
    };

    const expectValues = {
      status: 400,
      bodyHaveProperty: "message",
    };

    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(newValues);

    expect(response.status).toBe(expectValues.status);
    expect(response.body).toHaveProperty(expectValues.bodyHaveProperty);
  });
});
