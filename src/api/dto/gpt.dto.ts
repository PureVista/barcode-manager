import * as z from 'zod';
export interface GptResponse {
  product: GptProductModel;
  ingredients: GptIngredientsModel;
}

export const GptProductModel = z.object({
  name: z.string(),
  brand: z.string(),
  description: z.string(),
  isHarmful: z.boolean(),
  harmfulnessPercentage: z.number(),
  productType: z.string(),
});

export const GptIngredientsModel = z.object({
  ingredients: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      isHarmful: z.boolean(),
    })
  ),
});

export type GptProductModel = z.input<typeof GptProductModel>;
export type GptIngredientsModel = z.input<typeof GptIngredientsModel>;
