"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorService = exports.listAllAuthorsService = exports.loginAuthorService = exports.createAuthorService = void 0;
// Centralizar services
const createAuthor_service_1 = __importDefault(require("./createAuthor.service"));
exports.createAuthorService = createAuthor_service_1.default;
const loginAuthor_service_1 = __importDefault(require("./loginAuthor.service"));
exports.loginAuthorService = loginAuthor_service_1.default;
const listAllAuthors_service_1 = __importDefault(require("./listAllAuthors.service"));
exports.listAllAuthorsService = listAllAuthors_service_1.default;
const getAuthor_service_1 = __importDefault(require("./getAuthor.service"));
exports.getAuthorService = getAuthor_service_1.default;
//# sourceMappingURL=index.js.map