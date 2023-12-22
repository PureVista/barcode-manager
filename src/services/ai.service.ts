import OpenAI from 'openai';
import { env } from '../env';
import { takeIngredients, takeProduct } from '../utils';
import { GptIngredientsModel, GptProductModel, GptResponse } from '../api';

export class AIService {
  private apiKey: string = env.open_ai.apiKey;
  private model: string = env.open_ai.model;
  private openAI = new OpenAI({ apiKey: this.apiKey, maxRetries: 0, timeout: 20 * 1000 });

  askGpt = async (productName: string): Promise<GptResponse> => {
    const chatCompletionForIngredients = await this.openAI.chat.completions.create({
      messages: [takeIngredients(productName)],
      model: this.model,
    });
    const messageForIngredients = chatCompletionForIngredients.choices[0].message;
    if (!messageForIngredients.content) throw new Error('There is an error when fetching data from AI.');
    const ingredients: GptIngredientsModel = JSON.parse(messageForIngredients.content);

    const chatCompletionForProduct = await this.openAI.chat.completions.create({
      messages: [takeIngredients(productName), messageForIngredients, takeProduct(productName)],
      model: this.model,
    });
    const messageForProduct = chatCompletionForProduct.choices[0].message;
    if (!messageForProduct.content) throw new Error('There is an error when fetching data from AI.');
    const product: GptProductModel = JSON.parse(messageForProduct.content);

    return { product, ingredients: ingredients };
  };
}
