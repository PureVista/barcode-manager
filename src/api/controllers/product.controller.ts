import { Controller, Get, QueryParam, Res } from 'routing-controllers';
import { Response } from 'express';

import { ProductWithId } from '../../models';
import { ProductService } from '../../services';
import { ArrayResponse } from '..';

@Controller('/products')
export class ProductController {
  constructor(private productService: ProductService) {
    this.productService = new ProductService();
  }

  @Get()
  public async getProducts(
    @Res() res: Response<ArrayResponse<ProductWithId>>,
    @QueryParam('isFood') isFood?: boolean
  ): Promise<Response<ArrayResponse<ProductWithId>>> {
    try {
      const mongoQuery = this.productService.mapAPIQueryParamForProducts(isFood);
      const products = await this.productService.findAll(mongoQuery);
      return res.status(200).send({ result: products });
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
