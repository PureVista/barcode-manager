import { Body, Controller, Post, Res } from 'routing-controllers';
import { Response } from 'express';

import { AIService, IngredientService, ProductService } from '../../services';
import { ObjectResponse } from '..';
import { Ingredient, ProductType } from '../../models';

@Controller('/ai')
export class AIController {
  constructor(private aiService: AIService, private ingredientService: IngredientService, private productService: ProductService) {
    this.aiService = new AIService();
    this.ingredientService = new IngredientService();
    this.productService = new ProductService();
  }

  @Post()
  public async askGpt(
    @Body() body: { productName: string; productType?: ProductType },
    @Res() res: Response<ObjectResponse<any>>
  ): Promise<Response<ObjectResponse<any>>> {
    try {
      if (!body.productName || body.productName.length < 3)
        throw new Error('Product name must be sended and it must be longer than 2 characters.');
      const productType = body.productType === ProductType.C ? ProductType.C : ProductType.F;

      const gptResponse = await this.aiService.askGptWithProduct(body.productName);
      const insertedIngredients = await this.ingredientService.createMany(gptResponse.ingredients as Ingredient[]);
      const product = await this.productService.createFromGpt({ ...gptResponse.product, productType }, insertedIngredients);
      return res.status(200).send({ result: product });
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
