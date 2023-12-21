import OpenAI from 'openai';
import { env } from '../env';
import { fillHistory } from '../utils';
import { GptProductModel } from '../api';

export class AIService {
  private apiKey: string = env.open_ai.apiKey;
  private model: string = env.open_ai.model;
  private openAI = new OpenAI({ apiKey: this.apiKey, maxRetries: 0, timeout: 20 * 1000 });

  askGptWithProduct = async (productName: string): Promise<GptProductModel> => {
    const chatCompletion = await this.openAI.chat.completions.create({
      messages: fillHistory(productName),
      model: this.model,
    });
    const content = chatCompletion.choices[0].message.content;
    if (!content) throw new Error('There is an error when fetching data from AI.');
    const response: GptProductModel = JSON.parse(content);
    return response;
  };
}
