

import { projectSchema } from '../schemas/schema';

export const validateProject = (data: unknown) => {
  return projectSchema.safeParse(data);
};
