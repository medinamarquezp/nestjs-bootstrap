import { config } from 'dotenv';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions';

config();

// If running tests, an in-memory SQLite database will be used instead
// of the configured one. NODE_ENV=test is set by Jest.
const isTestRun = process.env.NODE_ENV === 'test';

const entities = [__dirname + '/../**/*.entity.{js,ts}'];
const migrationsDir = `src/database/migrations`;
const migrations = [`${__dirname}/../database/migrations/*.{js,ts}`];

const mysql: MysqlConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities,
    cli: {
        migrationsDir,
    },
    migrations,
    synchronize: false,
};

const sqlite: BetterSqlite3ConnectionOptions = {
    type: 'better-sqlite3',
    database: ':memory:',
    entities,
    cli: {
        migrationsDir,
    },
    migrations,
    // Drop existing tables and migrate entities associated to the
    // connection during its setup. dropSchema is used since the
    // connection will be reused in all tests in the same suite
    // (keepConnectionAlive = true) in TypeOrmModule config.
    synchronize: true,
    dropSchema: true,
};

// During testing, override database config with in-memory SQLite,
// and auto-migrate entities.
const ormConfig = isTestRun ? sqlite : mysql;

// Use an export assignment to be able to call TypeORM CLI with:
// ./node_modules/typeorm/cli.js --config src/config/typeorm.config.ts
export = ormConfig;