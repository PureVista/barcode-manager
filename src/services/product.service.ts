import { Filter } from 'mongodb';

import {  Product, ProductType, ProductWithId, Products } from '../models';

export class ProductService {
  findAll = async (query?: Filter<ProductWithId>): Promise<ProductWithId[]> => {
    const products = await Products.find(query ?? {}).toArray();
    return products;
  };

  findOne = async (query: Filter<ProductWithId>): Promise<ProductWithId | null> => {
    const product = await Products.findOne(query);
    return product;
  };

  createFromGpt = async (_product: Filter<Product>): Promise<ProductWithId> => {
    const product = Product.parse(_product);
    const insertResult = await Products.insertOne(product);
    return { _id: insertResult.insertedId, ...product };
  };

  mapAPIQueryParamForProducts = (isFood: boolean = false): Filter<ProductWithId> => {
    let mongoQuery: Filter<ProductWithId> = {};
    mongoQuery = isFood ? { ...mongoQuery, productType: ProductType.F } : { ...mongoQuery, productType: ProductType.C };
    return mongoQuery;
  };
}
