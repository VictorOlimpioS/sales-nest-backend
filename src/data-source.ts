import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

const isTs = __filename.endsWith('.ts');

export const AppDataSource = new DataSource({
  type: 'postgres',
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  synchronize: false,
  entities: [
    isTs
      ? join(process.cwd(), 'src/**/*.entity.ts')
      : join(process.cwd(), 'dist/**/*.entity.js'),
  ],
  migrations: [
    isTs
      ? join(process.cwd(), 'src/migration/*.ts')
      : join(process.cwd(), 'dist/migration/*.js'),
  ],
  migrationsRun: true,
});
