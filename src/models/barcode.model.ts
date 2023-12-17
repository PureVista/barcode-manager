import * as z from 'zod';
import { WithId } from 'mongodb';

export const Barcode = z.object({
  barcode: z.string(),
});

export type Barcode = z.infer<typeof Barcode>;
export type BarcodeWithId = WithId<Barcode>;
