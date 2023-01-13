"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showBookResponseSchema = exports.listBooksResponseSchema = exports.createBooksRequestSchema = void 0;
// Centralizar imports
const createBookRequest_schema_1 = __importDefault(require("./createBookRequest.schema"));
exports.createBooksRequestSchema = createBookRequest_schema_1.default;
const listBooksResponse_schema_1 = __importDefault(require("./listBooksResponse.schema"));
exports.listBooksResponseSchema = listBooksResponse_schema_1.default;
const showBookResponse_schema_1 = __importDefault(require("./showBookResponse.schema"));
exports.showBookResponseSchema = showBookResponse_schema_1.default;
//# sourceMappingURL=index.js.map