import * as z from 'zod';
import { WithId } from 'mongodb';

export const Product = z.object({
  barcode: z.string(),
});

export type Product = z.infer<typeof Product>;
export type ProductWithId = WithId<Product>;
