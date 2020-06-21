/** @author Hans Oksendahl */
import { router } from './constants.ts';

type Methods = 'post' | 'get' | 'put' | 'patch' | 'delete';

interface HeaderOptions {
  [_: string]: string,
}

export interface RouteOptions {
  method?: Methods,
  status?: number,
  headers?: HeaderOptions,
  body: any,
}

async function createRoute(
  path: RegExp,
  options: RouteOptions,
) {
  const method = options.method || 'get';
  const status = options.status || 200;
  const headerOptions = options.headers;
  const headers = new Headers();
  const body = typeof body === 'function'
    ? await 

  if (headerOptions) {
    for (const key of Object.keys(headerOptions)) {
      headers.set(key, headerOptions[key]);
    }
  }

  router[method](path, () => {
    return {
      status,
      headers,
      body,
    }
  })
}

export default createRoute;
