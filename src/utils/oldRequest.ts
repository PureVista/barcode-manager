import { ChatCompletionMessageParam } from 'openai/resources';

const firstMessage: string = `I need a JSON data. This data should list products and ingredients. There should be some properties in the JSON structure.\n

The fields must be always the same and they are name, brand, description, isHarmful, harmfullnessPercentage, productType for inside product object. name, description and isHarmful for ingredients array. So my json response should be return two things. An array of ingredients, and an object of product.

Description fields must have more length. It should at least 140 character text.

Json Data: ${{
  name: '',
  brand: '',
  description: 'About it`s harmfullness 2 or 3 line text.',
  isHarmful: '// Very Harmful / Harmful / Beneficial / Very Beneficial',
  harmfullnessPercentage: 50, // number between 0 - 100 for damaging health
  foodOrCosmetic: '', // Food OR Cosmetic
  ingredients: [
    {
      name: '',
      description: 'About it`s harmfullness 2 or 3 line text.',
      isHarmful: '// Very Harmful / Harmful / Beneficial / Very Beneficial',
    },
  ],
}}

Only return JSON, Don't write any text.
`;

export const fillHistory = (productName: string): Array<ChatCompletionMessageParam> => {
  const history: ChatCompletionMessageParam[] = [
    { role: 'user', content: firstMessage },
    { role: 'user', content: `Give it for the ${productName}?` },
  ];
  return history;
};
