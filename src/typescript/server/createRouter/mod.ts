/** @author Hans Oksendahl */
import { ServerRequest } from './deps.ts';

enum Actions {
  Post = 'POST',
  Get = 'GET',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
};

type AnyFunction<T extends any = any> = (..._: any[]) => T;

interface RouteHandler {
  pattern: RegExp;
  callback: AnyFunction;
};

type RouteHandlers = {
  [action in Actions]?: RouteHandler[];
};

class Router {
  private __actions: RouteHandlers;

  static of() {
    return new Router();
  }

  constructor() {
    this.__actions = {};
  }

  private __initAction(
    action: Actions
  ) {
    const actions = this.__actions[action] = this.__actions[action] || [];

    return actions;
  }

  get<T extends RegExp, U extends AnyFunction>(
    pattern: T,
    callback: U,
  ) {
    const handlers = this.__initAction(Actions.Get);

    handlers.push({ pattern, callback });
  }

  post<T extends RegExp, U extends AnyFunction>(
    pattern: T,
    callback: U,
  ) {
    const handlers = this.__initAction(Actions.Post);

    handlers.push({ pattern, callback });
  }

  put<T extends RegExp, U extends AnyFunction>(
    pattern: T,
    callback: U,
  ) {
    const handlers = this.__initAction(Actions.Put);

    handlers.push({ pattern, callback });
  }

  patch<T extends RegExp, U extends AnyFunction>(
    pattern: T,
    callback: U,
  ) {
    const handlers = this.__initAction(Actions.Patch);

    handlers.push({ pattern, callback });
  }

  delete<T extends RegExp, U extends AnyFunction>(
    pattern: T,
    callback: U,
  ) {
    const handlers = this.__initAction(Actions.Delete);

    handlers.push({ pattern, callback });
  }

  async run(
    req: ServerRequest,
  ) {
    const handlers = this.__actions[req.method as Actions];

    if (handlers) {
      for (let handler of handlers) {
        const { pattern, callback } = handler;
        const { url } = req;
        const { pathname } = new URL(`http://localhost${url}`);

        if (pattern.test(pathname)) {
          const match = pathname.match(pattern);
          const {
            headers: originalHeaders,
            body,
            ...rest
          } = await callback(match);
          const headers = new Headers();

          if (originalHeaders) {
            for (const key of Object.keys(originalHeaders)) {
              headers.set(key, originalHeaders[key]);
            }
          }
          
          await req.respond({
            headers,
            body,
            ...rest
          });
        }
      }
    }
  }
}

export default Router.of;
