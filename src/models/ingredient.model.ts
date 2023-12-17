import * as z from 'zod';
import { WithId } from 'mongodb';

export const Ingredient = z.object({
  name: z.string(),
  isAllergen: z.boolean().default(false),
  isDamaging: z.boolean().default(false),
  description: z.string(),
});

export type Ingredient = z.infer<typeof Ingredient>;
export type IngredientWithId = WithId<Ingredient>;
