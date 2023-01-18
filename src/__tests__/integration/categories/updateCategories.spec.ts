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

describe("Update categories tests", () => {
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
    await conn.destroy();
  });

  const category = [];
  const admToken = { token: "" };

  it("PATCH: /categories/:id -> Should be able to update a category", async () => {
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
    admToken.token = token;

    const newCategory = { name: "Ficção" };

    const createCategory = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(newCategory);

    expect(createCategory.status).toBe(201);
    expect(createCategory.body).toHaveProperty("id");

    category.push(createCategory.body);
    const categoryId: number = createCategory.body.id;

    const newCategoryName = { name: "Ação" };

    const response = await request(app)
      .patch(`${baseUrl}/${categoryId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newCategoryName);

    const expectResults = {
      status: 200,
      bodyToEqual: expect.objectContaining({
        id: categoryId,
        name: newCategoryName.name,
      }),
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(expectResults.bodyToEqual);
  });

  it("PATCH: /categories/:id -> Should not be able to update a category without permission token", async () => {
    const { id } = category[0];

    const newCategoryName = {
      name: "Romance",
    };

    const expectResults = {
      status: 401,
      bodyToHaveProperty: "message",
    };

    const response = await request(app)
      .patch(`${baseUrl}/${id}`)
      .send(newCategoryName);

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyToHaveProperty);
  });

  it("PATCH: /categories/:id -> Should not be able to update a category with invalid token", async () => {
    const { id } = category[0];

    const commonAuthorPayload = mockedCommonAuthorRequest;
    const createCommonAuthor = await request(app)
      .post("/author")
      .send(commonAuthorPayload);

    expect(createCommonAuthor.status).toBe(201);

    const loginPayload = mockedCommonAuthorSession.sessionPayload;
    const login = await request(app).post("/login").send(loginPayload);

    expect(login.status).toBe(200);
    expect(login.body).toHaveProperty("token");

    const commonAuthorToken: string = login.body.token;

    const newCategoryName = { name: "Romance" };

    const expectResults = {
      status: 403,
      bodyToHaveProperty: "message",
    };

    const response = await request(app)
      .patch(`${baseUrl}/${id}`)
      .set("Authorization", `Bearer ${commonAuthorToken}`)
      .send(newCategoryName);

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyToHaveProperty);
  });

  it("PATCH: /categories/id -> Should not be able to update a category with invalid data", async () => {
    const { token } = admToken;
    const { id } = category[0];

    const invalidCategoryData = {
      invalidKey: "any",
      anotherInvalidKey: 3029103,
    };

    const expectResults = {
      status: 400,
      bodyToHaveProperty: "message",
    };

    const response = await request(app)
      .patch(`${baseUrl}/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(invalidCategoryData);

      console.log(response.status)
      console.log(response.body)

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyToHaveProperty);
  });
});
