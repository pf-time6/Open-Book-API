"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("express-async-errors");
const express_1 = __importStar(require("express"));
const routes_1 = require("./routes");
const errors_1 = require("./errors");
//INSTANCIA EXPRESS
const app = (0, express_1.default)();
app.use((0, express_1.json)());
//ROTAS
app.use("/author", routes_1.authorRoutes);
app.use("/login", routes_1.loginRoutes);
app.use("/books", routes_1.booksRoutes);
app.use("", routes_1.pagesRoutes);
app.use("/categories", routes_1.categoriesRoutes);
app.use(errors_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map