"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const dataSourceConfig = () => {
    const entitiesPath = path_1.default.join(__dirname, "./entities/**.{js,ts}");
    const migrationsPath = path_1.default.join(__dirname, "./migrations/**.{js,ts}");
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === "production") {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: [entitiesPath],
            migrations: [migrationsPath],
        };
    }
    if (nodeEnv === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            entities: [entitiesPath],
            migrations: [migrationsPath],
            synchronize: true,
        };
    }
    return {
        type: "postgres",
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        port: parseInt(process.env.PGPORT),
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationsPath],
    };
};
const AppDataSource = new typeorm_1.DataSource(dataSourceConfig());
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map