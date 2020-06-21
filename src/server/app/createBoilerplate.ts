/** @author Hans Oksendahl */
import { router } from './constants.ts';

export interface BoilerplateOptions {
  status?: number,
  headers?: Headers,
  body: string,
}

function createBoilerplate(
  path,
  options: BoilerplateOptions,
) {
  const status = options.status || 200;
  const headers = new Headers();
  const body = `${options.body}`;

  for (const key of Object.keys(headers)) {

  }

  router[method](path, () => {
    return {
      status,
      headers,
      body,
    }
  })
}

router.get(/^\/$/, () => {
  const markup = h.html([
    h.head([
      h.script({
        src: '/test.ts'
      })
    ])
  ]);

  return { body: `${markup}` };
});