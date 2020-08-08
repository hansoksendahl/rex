import { serve } from './deps.ts';
import main from './src/typescript/server/app/mod.ts';

const port = Deno.env.get('DOCKER_PORT') || 0;
const server = serve({ port: +port });

console.log(`🦖 Rar! http://localhost:${port}`);

for await (const req of server) {
  main(req);
}
