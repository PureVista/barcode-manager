import * as z from 'zod';

export const GptProductModel = z.object({
  product: z.array(
    z.object({
      name: z.string(),
      brand: z.string(),
      description: z.string(),
      isHarmful: z.boolean(),
      harmfulnessPercentage: z.number(),
      productType: z.string(),
    })
  ),
  ingredients: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      isHarmful: z.boolean(),
    })
  ),
});

export type GptProductModel = z.input<typeof GptProductModel>;
