import { Controller, Get, QueryParam, Res } from 'routing-controllers';
import { Response } from 'express';

import { ProductWithId } from '../../models';
import { ProductService } from '../../services/product.service';

@Controller('/product')
export class ProductController {
  constructor(public productService: ProductService) {}

  @Get()
  public async getProducts(@Res() res: Response<Array<ProductWithId>>, @QueryParam('isFood') isFood?: boolean) {
    try {
      const mongoQuery = this.productService.mapAPIQueryParamForProducts(isFood);
      const products = await this.productService.findAll(mongoQuery);
      return res.status(200).send(products);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
