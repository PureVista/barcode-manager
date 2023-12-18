import OpenAI from 'openai';
import { env } from '../env';
import { fillHistory } from '../utils';

export class AIService {
  private apiKey: string = env.open_ai.apiKey;
  openAI = new OpenAI({ apiKey: this.apiKey, maxRetries: 0, timeout: 20 * 1000 });

  askGptWithProduct = async (productName: string) => {
    const chatCompletion = await this.openAI.chat.completions.create({
      messages: fillHistory(productName),
      model: 'gpt-3.5-turbo',
    });
    return chatCompletion.choices[0].message.content;
  };
}
