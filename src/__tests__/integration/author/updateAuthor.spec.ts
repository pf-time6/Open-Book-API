import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Author from "../../../entities/author.entity";
import {
  mockedCommonAuthorRequest,
  mockedCommonAuthorPatchRequest,
  mockedCommonAuthorSession,
  mockedAdminAuthorRequest,
  mockedAdminAuthorSession,
} from "../../mocks";

describe("Retrieve Author Tests", () => {
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

  it("PATCH: /author/:id -> Should be able to update the name of an author", async () => {
    const authorPayload = mockedCommonAuthorRequest;

    const author = await request(app).post(baseUrl).send(authorPayload);
    expect(author.status).toBe(201);

    const loginData = mockedCommonAuthorSession.sessionPayload;
    const loginResponse = await request(app).post("/login").send(loginData);

    const token: string = loginResponse.body.token;

    const { name } = mockedCommonAuthorPatchRequest;

    const data = {
      name,
    };

    const response = await request(app)
      .patch(`${baseUrl}/${author.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const expectResults = {
      status: 200,
      name,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBe(expectResults.name);
  });

  it("PATCH: /author/:id -> Should be able to update the city of an author", async () => {
    const authorPayload = mockedCommonAuthorRequest;

    const author = await request(app).post(baseUrl).send(authorPayload);
    expect(author.status).toBe(201);

    const loginData = mockedCommonAuthorSession.sessionPayload;
    const loginResponse = await request(app).post("/login").send(loginData);

    const token: string = loginResponse.body.token;

    const { city } = mockedCommonAuthorPatchRequest;

    const data = {
      city,
    };

    const response = await request(app)
      .patch(`${baseUrl}/${author.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const expectResults = {
      status: 200,
      city,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty("city");
    expect(response.body.city).toBe(expectResults.city);
  });

  it("PATCH: /author/:id -> Should be able to update the country of an author", async () => {
    const authorPayload = mockedCommonAuthorRequest;

    const author = await request(app).post(baseUrl).send(authorPayload);
    expect(author.status).toBe(201);

    const loginData = mockedCommonAuthorSession.sessionPayload;
    const loginResponse = await request(app).post("/login").send(loginData);

    const token: string = loginResponse.body.token;

    const { country } = mockedCommonAuthorPatchRequest;

    const data = {
      country,
    };

    const response = await request(app)
      .patch(`${baseUrl}/${author.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const expectResults = {
      status: 201,
      country,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty("country");
    expect(response.body.country).toBe(expectResults.country);
  });

  it("PATCH: /author/:id -> Should be able to update the password of an author", async () => {
    const authorPayload = mockedCommonAuthorRequest;

    const author = await request(app).post(baseUrl).send(authorPayload);
    expect(author.status).toBe(201);

    const loginData = mockedCommonAuthorSession.sessionPayload;
    const loginResponse = await request(app).post("/login").send(loginData);

    const token: string = loginResponse.body.token;

    const { password } = mockedCommonAuthorPatchRequest;

    const data = {
      password,
    };

    const response = await request(app)
      .patch(`${baseUrl}/${author.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const expectResults = {
      status: 201,
      bodyToEqual: {
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        city: expect.any(String),
        country: expect.any(String),
        isAdm: expect.any(Boolean),
        isActive: expect.any(Boolean),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toStrictEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });

  it("PATCH: /author/:id -> Should not be able to update the isActive field value", async () => {
    const authorPayload = mockedCommonAuthorRequest;

    const author = await request(app).post(baseUrl).send(authorPayload);
    expect(author.status).toBe(201);

    const loginData = mockedCommonAuthorSession.sessionPayload;
    const loginResponse = await request(app).post("/login").send(loginData);

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");

    const token: string = loginResponse.body.token;

    const data = {
      isActive: false,
    };

    const response = await request(app)
      .patch(`${baseUrl}/${author.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const expectResults = {
      status: 400,
      bodyToHaveProperty: "message",
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyToHaveProperty);
  });

  it("PATCH: /author/:id -> Should not be able to update the isAdm field value", async () => {
    const authorPayload = mockedCommonAuthorRequest;

    const author = await request(app).post(baseUrl).send(authorPayload);
    expect(author.status).toBe(201);

    const loginData = mockedCommonAuthorSession.sessionPayload;
    const loginResponse = await request(app).post("/login").send(loginData);

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");

    const token: string = loginResponse.body.token;

    const data = {
      isAdm: true,
    };

    const response = await request(app)
      .patch(`${baseUrl}/${author.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const expectResults = {
      status: 400,
      bodyToHaveProperty: "message",
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyToHaveProperty);
  });

  it("PATCH: /author/:id -> Should not be able to update the id field value", async () => {
    const authorPayload = mockedCommonAuthorRequest;

    const author = await request(app).post(baseUrl).send(authorPayload);
    expect(author.status).toBe(201);

    const loginData = mockedCommonAuthorSession.sessionPayload;
    const loginResponse = await request(app).post("/login").send(loginData);

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");

    const token: string = loginResponse.body.token;

    const data = {
      id: "e4d3294a-b671-4783-aef9-5dcb614c89b4",
    };

    const response = await request(app)
      .patch(`${baseUrl}/${author.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const expectResults = {
      status: 400,
      bodyToHaveProperty: "message",
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyToHaveProperty);
  });

  it("PATCH: /author/:id -> Should not be able to update another user withoud adm permission", async () => {
    const authorPayload = mockedCommonAuthorRequest;
    const admAuthorPayload = mockedAdminAuthorRequest;

    const commonAuthor = await request(app).post(baseUrl).send(authorPayload);
    expect(commonAuthor.status).toBe(201);
    expect(commonAuthor.body).toHaveProperty("id");

    const admAuthor = await request(app).post(baseUrl).send(admAuthorPayload);
    expect(admAuthor.status).toBe(201);
    expect(admAuthor.body).toHaveProperty("id");

    const idNotBelonging: string = admAuthor.body.id;

    const loginData = mockedCommonAuthorSession.sessionPayload;
    const loginResponse = await request(app).post("/login").send(loginData);
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");

    const token: string = loginResponse.body.token;

    const data = mockedCommonAuthorPatchRequest;

    const response = await request(app)
      .patch(`${baseUrl}/${idNotBelonging}`)
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const expectResults = {
      status: 403,
      bodyToHaveProperty: "message",
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toHaveProperty(expectResults.bodyToHaveProperty);
  });

  it("PATCH: /author/:id -> Should be able to update another user with adm permission", async () => {
    const authorPayload = mockedCommonAuthorRequest;
    const admAuthorPayload = mockedAdminAuthorRequest;

    const commonAuthor = await request(app).post(baseUrl).send(authorPayload);
    expect(commonAuthor.status).toBe(201);
    expect(commonAuthor.body).toHaveProperty("id");

    const idNotBelonging: string = commonAuthor.body.id;

    const admAuthor = await request(app).post(baseUrl).send(admAuthorPayload);
    expect(admAuthor.status).toBe(201);
    expect(admAuthor.body).toHaveProperty("id");

    const loginData = mockedAdminAuthorSession.sessionPayload;
    const loginResponse = await request(app).post("/login").send(loginData);
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");

    const token: string = loginResponse.body.token;

    const data = mockedCommonAuthorPatchRequest;

    const response = await request(app)
      .patch(`${baseUrl}/${idNotBelonging}`)
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    const expectResults = {
      status: 200,
      bodyToEqual: {
        id: expect.any(String),
        name: data.name,
        email: expect.any(String),
        city: data.city,
        country: data.country,
        isAdm: expect.any(Boolean),
        isActive: expect.any(Boolean),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectResults.bodyToEqual)
    );
  });
});
