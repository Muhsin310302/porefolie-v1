import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { config } from 'dotenv';

config(); 

let db: Database | null = null;

export const initializeDB = async (): Promise<Database> => {
  if (!db) {
    db = await open({
      filename: process.env.DATABASE_URL || './db/database.sqlite',
      driver: sqlite3.Database,

    });
    console.log("Database connection established");
  }
  return db;
};


export type DB = Database;
export { db };
