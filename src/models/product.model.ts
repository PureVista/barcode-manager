import * as z from 'zod';
import { ObjectId, WithId } from 'mongodb';
import { db } from '../loaders';

export enum ProductType {
  F = 'Food',
  C = 'Cosmetic',
}

export const Product = z.object({
  name: z.string(),
  barcodes: z.array(z.string()).default([]).optional(),
  brand: z.string(),
  description: z.string(),
  isHarmful: z.boolean(),
  harmfulnessPercentage: z.number(),
  productType: z.nativeEnum(ProductType),
  ingredients: z.array(z.instanceof(ObjectId)).default([]).optional(),
  createdAt: z.date().optional().default(new Date()),
  updatedAt: z.date().optional().default(new Date()),
});

export type Product = z.infer<typeof Product>;
export type ProductWithId = WithId<Product>;

export const Products = db.collection<Product>('products');
