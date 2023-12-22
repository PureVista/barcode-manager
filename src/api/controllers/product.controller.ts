import { Controller, Get, QueryParam, Req, Res } from 'routing-controllers';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { ProductWithId } from '../../models';
import { ProductService } from '../../services';
import { ArrayResponse, ObjectResponse } from '..';

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

  @Get('/:id')
  public async getProduct(@Req() request: Request, @Res() res: Response<ObjectResponse<any>>): Promise<Response<ObjectResponse<any>>> {
    try {
      const _id = new ObjectId(request.params._id);
      const product = await this.productService.findOne({ _id });
      if (!product) throw new Error(`There is no product with this id: ${_id}`);

      return res.status(200).send({ result: product });
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
