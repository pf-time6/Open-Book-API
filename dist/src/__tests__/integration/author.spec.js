"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const data_source_1 = __importDefault(require("../../data-source"));
const author_entity_1 = __importDefault(require("../../entities/author.entity"));
//mocks
const mocks_1 = require("../mocks");
describe("Author route", () => {
    let baseUrl = "/author";
    let conn;
    let authorRepo;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((dataSource) => {
            conn = dataSource;
            authorRepo = conn.getRepository(author_entity_1.default);
        })
            .catch((err) => console.error(err));
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const authors = yield authorRepo.find();
        yield authorRepo.remove(authors);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield conn.destroy();
    }));
    it("Must be possible create an User", () => __awaiter(void 0, void 0, void 0, function* () {
        const authorPayload = mocks_1.mockedCommonAuthorRequest;
        const response = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send(authorPayload);
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
                updatedAt: expect.any(String)
            }),
            bodyNotHaveProperty: "password"
        };
        expect(response.status).toBe(routeResponse.status);
        expect(response.body).not.toHaveProperty(routeResponse.bodyNotHaveProperty);
        expect(response.body).toStrictEqual(routeResponse.bodyStrictEqual);
    }));
});
//# sourceMappingURL=author.spec.js.map