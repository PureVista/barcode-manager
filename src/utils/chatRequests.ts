import { ChatCompletionMessageParam } from 'openai/resources';

export const takeIngredients = (productName: string, brand?: string): ChatCompletionMessageParam => {
  return {
    role: 'user',
    content: `I need to see what is harmful and what is not, so act me as a food engineer and send me a JSON for a given product.\n I need only JSON data, because I will processing them after.
  Json data should be hold ingredients array. It’s type should be an object. There is some variables for ingredients:\n      
  {
    ingredients: [
      name: “”, // name of ingredient's name
      description: “”, // it should give information about usage, harmfulness should be more than 200 words
    isHarmful: boolean
    ]
  }
  Given product is ${productName} ${brand && `${brand}`}. Don't return any text, return only JSON data.`,
  };
};

export const takeProduct = (productName: string): ChatCompletionMessageParam => {
  return {
    role: 'user',
    content: `Then you need to analyze this product as a data miner. Is this product harmful, what is its harmfulness percentage. Give me a JSON result.\n 
    {
      name: ""
      brand: ""
      isHarmful: boolean
      harmfulnessPercentage: number // %
      description: “” text about its harmfullness and about product
    }\n
    I know its hypothetical, just return JSON data, don’t write any text without JSON data. Given product is ${productName}`,
  };
};
