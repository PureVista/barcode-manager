import { Application } from 'express';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework';
import { createExpressServer } from 'routing-controllers';
import { env } from '../env';
import { JsonBodyParserMiddleware, UrlencodedBodyParserMiddleware } from '../api';

export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
  const expressApp: Application = createExpressServer({
    routePrefix: '/api',
    middlewares: [JsonBodyParserMiddleware, UrlencodedBodyParserMiddleware],
    controllers: [],
    classTransformer: false,
    cors: true,
  });

  expressApp.get('/', (req, res) => {
    res.send(`Hello World!. ${env.app.name} Started on port ${env.app.port}`);
  });
  const server = expressApp.listen(env.app.port);

  console.info(`${env.app.name} Started on port ${env.app.port}`);
  settings?.setData('express_app', server);
  settings?.setData('express_app', expressApp);
};
