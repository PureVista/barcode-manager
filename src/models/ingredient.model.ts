import * as z from 'zod';
import { WithId } from 'mongodb';
import { db } from '../loaders';

export const Ingredient = z.object({
  name: z.string(),
  isHarmful: z.boolean(),
  description: z.string(),
  isResponsed: z.boolean(),
  isApproved: z.boolean(),
  createdAt: z.date().optional().default(new Date()),
  updatedAt: z.date().optional().default(new Date()),
});

export type Ingredient = z.infer<typeof Ingredient>;
export type IngredientWithId = WithId<Ingredient>;

export const Ingredients = db.collection<Ingredient>('ingredients');
