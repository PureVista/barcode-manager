import { Filter } from 'mongodb';

import { IngredientWithId, Product, ProductType, ProductWithId, Products } from '../models';

export class ProductService {
  findAll = async (query?: Filter<ProductWithId>): Promise<ProductWithId[]> => {
    const products = await Products.find(query ?? {}).toArray();
    return products;
  };

  createFromGpt = async (_product: Filter<Product>, ingredients: IngredientWithId[]): Promise<ProductWithId> => {
    const product = Product.parse(_product);
    const ingredientsIds = ingredients.map((ingredient) => ingredient._id);
    product.ingredients = ingredientsIds;
    const insertResult = await Products.insertOne(product);
    return { _id: insertResult.insertedId, ...product };
  };

  mapAPIQueryParamForProducts = (isFood: boolean = false): Filter<ProductWithId> => {
    let mongoQuery: Filter<ProductWithId> = {};
    mongoQuery = isFood ? { ...mongoQuery, productType: ProductType.F } : { ...mongoQuery, productType: ProductType.C };
    return mongoQuery;
  };
}
