import {
  ServerRequest,
  exists,
  h,
} from './deps.ts';
import { router } from './constants.ts';
import createRoute from './createRoute.ts';

createRoute(/^\/$/, {
  body: h.html([
    h.head([
      h.script({
        src: '/test.ts'
      })
    ])
  ])
});

router.get(/^\/([^\.]+)\.ts$/, async (match: string[]) => {
  const path = `./src/client/${match[1]}.ts`;
  const fileExists = await exists(path);

  if (fileExists) {
    const [_, body] = await Deno.bundle(path);
    const headers = new Headers();
    headers.set('content-type', 'text/javascript');

    return { headers, body };
  }
});

createRoute(/^.*$/, {
  status: 404,
  body: h.html([
    h.body('404: Not found')
  ])
});

export default function main(
  req: ServerRequest,
) {
  router.run(req);
}
