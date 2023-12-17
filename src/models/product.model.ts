import * as z from 'zod';
import { ObjectId, WithId } from 'mongodb';

export enum ProductType {
  F = 'Food',
  C = 'Cosmetic',
}

export const Product = z.object({
  name: z.string(),
  barcode: z.string(),
  brand: z.string(),
  description: z.string(),
  isHarmful: z.boolean(),
  harmfulPercent: z.number(),
  productType: z.nativeEnum(ProductType),
  ingredients: z.array(z.instanceof(ObjectId)).default([]).optional(),
  createdAt: z.date().optional().default(new Date()),
  updatedAt: z.date().optional().default(new Date()),
});

export type Product = z.infer<typeof Product>;
export type ProductWithId = WithId<Product>;