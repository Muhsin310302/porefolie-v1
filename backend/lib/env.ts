/*// backend/src/lib/env.ts

import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  FRONTEND_URL: z.string().url(),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("🚨 Invalid environment variables:", parsedEnv.error.flatten());
  process.exit(1);
}

export const env = parsedEnv.data;
*/