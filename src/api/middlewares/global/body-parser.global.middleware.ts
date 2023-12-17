import { json, urlencoded } from 'body-parser';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before', priority: 2 })
export class JsonBodyParserMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any): any {
    return json()(request, response, next);
  }
}

@Middleware({ type: 'before', priority: 3 })
export class UrlencodedBodyParserMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any): any {
    return urlencoded({ extended: true })(request, response, next);
  }
}
