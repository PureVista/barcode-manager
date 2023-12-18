import { ChatCompletionMessageParam } from 'openai/resources';

const firstMessage: string = `I need a JSON data. This data should list products and ingredients. There should be some properties in the JSON structure.\n

The fields must be always the same and they are name, brand, description, isHarmful, harmfullnessPercentage, productType for product. name, description and isHarmful for ingredients.

Json Data: ${{
  name: '',
  brand: '',
  description: '',
  isHarmful: 'Very Harmful / Harmful / Beneficial / Very Beneficial',
  harmfullnessPercentage: 70, // number 0 - 100
  productType: 'Food / Cosmetic',
  ingredients: [
    {
      name: '',
      description: 'About it`s harmfullness',
      isHarmful: 'Very Harmful / Harmful / Beneficial / Very Beneficial',
    },
  ],
}}
`;

export const fillHistory = (productName: string): Array<ChatCompletionMessageParam> => {
  const history: ChatCompletionMessageParam[] = [
    { role: 'user', content: firstMessage },
    { role: 'user', content: `Give it for the ${productName}?` },
  ];
  return history;
};
