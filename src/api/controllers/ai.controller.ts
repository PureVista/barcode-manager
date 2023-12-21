import { Body, Controller, Post, Res } from 'routing-controllers';
import { Response } from 'express';

import { AIService } from '../../services';
import { GptProductModel, ObjectResponse } from '..';

@Controller('/ai')
export class AIController {
  constructor(private aiService: AIService) {
    this.aiService = new AIService();
  }

  @Post()
  public async askGpt(
    @Body() body: { productName: string },
    @Res() res: Response<ObjectResponse<GptProductModel>>
  ): Promise<Response<ObjectResponse<GptProductModel>>> {
    try {
      if (!body.productName || body.productName.length < 3)
        throw new Error('Product name must be sended and it must be longer than 2 characters.');
      const gptResponse = await this.aiService.askGptWithProduct(body.productName);

      return res.status(200).send({ result: gptResponse });
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
