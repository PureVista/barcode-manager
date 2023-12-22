import { IScheduler } from '../interfaces';
import { ProductService } from '../services';

export class ScrapeImages implements IScheduler {
  name: string = 'ScrapeImages';
  productService = new ProductService();
  constructor(public limit: number, public batchSize: number) {}

  onTick = async (): Promise<void> => {
    try {
      const productsWithoutImages = await this.productService.findAll({ isImageFilled: false });
      console.log('eren');
      if (!productsWithoutImages.length) return;
    } catch (error) {}
  };
}
