import { Filter, UpdateFilter } from 'mongodb';

import { ImageStatus, Product, ProductType, ProductWithId, Products } from '../models';

export class ProductService {
  findAll = async (query?: Filter<ProductWithId>): Promise<ProductWithId[]> => {
    const products = await Products.find(query ?? {}).toArray();
    return products;
  };

  findDocumentsWithStatusNone = async (limit: number): Promise<ProductWithId[]> => {
    const eComOrderReturns = await Products.find({ status: ImageStatus.N }).limit(limit).toArray();
    return eComOrderReturns;
  };

  findOne = async (query: Filter<ProductWithId>): Promise<ProductWithId | null> => {
    const product = await Products.findOne(query);
    return product;
  };

  create = async (_product: Filter<Product>): Promise<ProductWithId> => {
    const product = Product.parse(_product);
    const insertResult = await Products.insertOne(product);
    return { _id: insertResult.insertedId, ...product };
  };

  updateProcessingProductsToFailed = async (): Promise<boolean> => {
    const product = await Products.updateMany({ imageStatus: ImageStatus.P }, { $set: { imageStatus: ImageStatus.F } });
    return product.acknowledged;
  };

  updateOneToFailed = async (query: Filter<Product>): Promise<boolean> => {
    const product = await Products.updateMany(query, { $set: { imageStatus: ImageStatus.F } });
    return product.acknowledged;
  };

  updateNoneProductsToProcessing = async (): Promise<boolean> => {
    const product = await Products.updateMany({ imageStatus: ImageStatus.N }, { $set: { imageStatus: ImageStatus.P } });
    return product.acknowledged;
  };

  updateMany = async (query: Filter<ProductWithId>, updateFilter: UpdateFilter<Product>): Promise<boolean> => {
    const product = Products.updateMany(query, updateFilter);
    return (await product).acknowledged;
  };

  mapAPIQueryParamForProducts = (isFood: boolean = false): Filter<ProductWithId> => {
    let mongoQuery: Filter<ProductWithId> = {};
    mongoQuery = isFood ? { ...mongoQuery, productType: ProductType.F } : { ...mongoQuery, productType: ProductType.C };
    return mongoQuery;
  };
}
