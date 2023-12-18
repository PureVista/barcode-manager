import OpenAI from 'openai';
import { env } from '../env';

export class AIService {
  private apiKey: string = env.open_ai.apiKey;
  openAI = new OpenAI({ apiKey: this.apiKey, maxRetries: 0, timeout: 20 * 1000 });

  gptAsk = async () => {
    const chatCompletion = await this.openAI.chat.completions.create({
      messages: [{ role: 'user', content: 'Say this is a test' }],
      model: 'gpt-3.5-turbo',
    });
    console.log(chatCompletion);
  };
}
