import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { WaitlistEntry } from '../entities';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL!,
  entities: [WaitlistEntry],
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
  ssl: {
    rejectUnauthorized: false
  }
});

export default AppDataSource;