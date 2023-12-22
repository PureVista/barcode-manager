import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework';
import { mongoLoader, expressLoader, schedulerLoader } from './loaders';

bootstrapMicroframework([mongoLoader, expressLoader, schedulerLoader])
  .then(() => console.log('Application is up and running.'))
  .catch((error) => console.error(`Application is crashed: ${error}`));
