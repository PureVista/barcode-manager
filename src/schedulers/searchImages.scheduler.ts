import { IScheduler } from '../interfaces';
import { ProductWithId } from '../models';
import { ProductService } from '../services';

export class SearchImages implements IScheduler {
  name: string = 'ScrapeImages';
  productService = new ProductService();
  constructor(public limit: number, public batchSize: number) {}

  onTick = async (): Promise<void> => {
    try {
      const productsWithoutImages = await this.productService.findDocumentsWithStatusNone(this.limit);
      if (!productsWithoutImages.length) return;

      const productIds = productsWithoutImages.map((product) => product._id);
      await this.productService.updateNoneProductsToProcessing();

      for (let i = 0; i < productsWithoutImages.length; i += this.batchSize) {
        const requests = productsWithoutImages.slice(i, i + this.batchSize).map(async (product) => {
          await this.searchImage(product);
        });
        await Promise.all(requests);
      }
    } catch (error) {
      await this.productService.updateProcessingProductsToFailed();
    }
  };

  searchImage = async (product: ProductWithId): Promise<void> => {
    try {
      
    } catch (error) {
      await this.productService.updateOneToFailed(product);
    }
  };
}
