import { Body, Controller, Post, Res } from 'routing-controllers';
import { Response } from 'express';

import { AIService, IngredientService } from '../../services';
import { GptProductModel, ObjectResponse } from '..';
import { Ingredient } from '../../models';

@Controller('/ai')
export class AIController {
  constructor(private aiService: AIService, private ingredientService: IngredientService) {
    this.aiService = new AIService();
    this.ingredientService = new IngredientService();
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
      await this.ingredientService.createMany(gptResponse.ingredients as Ingredient[]);

      return res.status(200).send({ result: gptResponse });
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
