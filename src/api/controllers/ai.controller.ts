import { Body, Controller, Post, Res } from 'routing-controllers';
import { Response } from 'express';

import { AIService, ProductService } from '../../services';
import { ObjectResponse } from '..';
import { ProductType } from '../../models';

@Controller('/ai')
export class AIController {
  constructor(private aiService: AIService, private productService: ProductService) {
    this.aiService = new AIService();
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

      const { product, ingredients: ingredients } = await this.aiService.askGpt(body.productName);
      const createdProduct = await this.productService.create({
        ...product,
        productType,
        ingredients: ingredients.ingredients,
      });
      return res.status(200).send({ result: createdProduct });
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
