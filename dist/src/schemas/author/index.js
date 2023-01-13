"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorArrayReturnSchema = exports.loginAuthorSchema = exports.createAuthorReturnSchema = exports.createAuthorRequestSchema = void 0;
// Centralizar imports
const createAuthorRequest_schema_1 = __importDefault(require("./createAuthorRequest.schema"));
exports.createAuthorRequestSchema = createAuthorRequest_schema_1.default;
const createAuthorReturn_schema_1 = __importDefault(require("./createAuthorReturn.schema"));
exports.createAuthorReturnSchema = createAuthorReturn_schema_1.default;
const loginAuthor_schema_1 = __importDefault(require("./loginAuthor.schema"));
exports.loginAuthorSchema = loginAuthor_schema_1.default;
const authorArrayReturn_schema_1 = __importDefault(require("./authorArrayReturn.schema"));
exports.authorArrayReturnSchema = authorArrayReturn_schema_1.default;
//# sourceMappingURL=index.js.map