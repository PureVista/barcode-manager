import * as z from 'zod';
import { ObjectId, WithId } from 'mongodb';
import { db } from '../loaders';

export enum ProductType {
  F = 'Food',
  C = 'Cosmetic',
}

export const Ingredient = z.object({
  name: z.string(),
  isHarmful: z.boolean(),
  description: z.string(),
  isResponsed: z.boolean().default(false),
  isApproved: z.boolean().default(false),
});

export const Product = z.object({
  name: z.string(),
  barcodes: z.array(z.string()).default([]).optional(),
  brand: z.string(),
  description: z.string(),
  isHarmful: z.boolean(),
  harmfulnessPercentage: z.number(),
  productType: z.nativeEnum(ProductType),
  ingredients: z.array(Ingredient).default([]).optional(),
  createdAt: z.date().optional().default(new Date()),
  updatedAt: z.date().optional().default(new Date()),
});

export type Product = z.infer<typeof Product>;
export type ProductWithId = WithId<Product>;

export const Products = db.collection<Product>('products');
