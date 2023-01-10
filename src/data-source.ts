import { DataSource } from "typeorm";
import "reflect-metadata";
import path from "path";
import "dotenv/config";

const AppDataSource =
  process.env.NODE_ENV === "test"
    ? new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: [path.join(__dirname, "./entities/**.{js,ts}")],
        migrations: [path.join(__dirname, "./migrations/**.{js,ts}")],
        synchronize: true,
      })
    : new DataSource({
        type: "postgres",
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        port: parseInt(process.env.PGPORT),
        logging: true,
        entities: [path.join(__dirname, "./entities/**.{js,ts}")],
        migrations: [path.join(__dirname, "./migrations/**.{js,ts}")],
      });

export default AppDataSource;
