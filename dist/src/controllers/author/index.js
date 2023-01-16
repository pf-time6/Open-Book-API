"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorController = exports.listAllAuthorsController = exports.loginAuthorController = exports.createAuthorController = void 0;
// Centralizar controllers
const createAuthor_controller_1 = __importDefault(require("./createAuthor.controller"));
exports.createAuthorController = createAuthor_controller_1.default;
const loginAuthor_controller_1 = __importDefault(require("./loginAuthor.controller"));
exports.loginAuthorController = loginAuthor_controller_1.default;
const listAllAuthors_controller_1 = __importDefault(require("./listAllAuthors.controller"));
exports.listAllAuthorsController = listAllAuthors_controller_1.default;
const getAuthor_controller_1 = __importDefault(require("./getAuthor.controller"));
exports.getAuthorController = getAuthor_controller_1.default;
//# sourceMappingURL=index.js.map