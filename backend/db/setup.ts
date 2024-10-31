
import { initializeDB } from './db';
import { createTables } from './tables';

export const setup = async () => {
  const db = await initializeDB(); 
  await createTables(db);
  console.log("Database setup completed.");
};
