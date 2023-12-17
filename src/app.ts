import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework';
import { expressLoader } from './loaders';

bootstrapMicroframework([expressLoader])
  .then(() => console.log('Application is up and running.'))
  .catch((error) => console.error(`Application is crashed: ${error}`));
