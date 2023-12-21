import { Filter } from 'mongodb';

import { ProductType, ProductWithId, Products } from '../models';

export class ProductService {
  findAll = async (query?: Filter<ProductWithId>): Promise<ProductWithId[]> => {
    const products = await Products.find(query ?? {}).toArray();
    return products;
  };

  mapAPIQueryParamForProducts = (isFood: boolean = false): Filter<ProductWithId> => {
    let mongoQuery: Filter<ProductWithId> = {};
    mongoQuery = isFood ? { ...mongoQuery, productType: ProductType.F } : { ...mongoQuery, productType: ProductType.C };
    return mongoQuery;
  };
}
