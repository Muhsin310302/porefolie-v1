// src/schemas/schema.ts

import { z } from 'zod';

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  link: z.string().url(),
  publishedAt: z.string().optional(),
  public: z.boolean().default(true),
  status: z.enum(['draft', 'published']).default('draft'),
  tags: z.array(z.string()).optional(),
});

export type Project = z.infer<typeof projectSchema>;

// New type that includes created_at and updated_at
export type ProjectWithTimestamps = Project & {
  id: string;
  created_at: string;
  updated_at: string;
};
