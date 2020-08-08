import {
  ServerRequest,
  exists,
  readFileStr,
} from './deps.ts';
import { router } from './constants.ts';

const SKELETON = `
<html>
  <head>
    <style type="text/css">
    /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
 */
 
 html, body, div, span, applet, object, iframe,
 h1, h2, h3, h4, h5, h6, p, blockquote, pre,
 a, abbr, acronym, address, big, cite, code,
 del, dfn, em, img, ins, kbd, q, s, samp,
 small, strike, strong, sub, sup, tt, var,
 b, u, i, center,
 dl, dt, dd, ol, ul, li,
 fieldset, form, label, legend,
 table, caption, tbody, tfoot, thead, tr, th, td,
 article, aside, canvas, details, embed, 
 figure, figcaption, footer, header, hgroup, 
 menu, nav, output, ruby, section, summary,
 time, mark, audio, video {
   margin: 0;
   padding: 0;
   border: 0;
   font-size: 100%;
   font: inherit;
   vertical-align: baseline;
 }
 /* HTML5 display-role reset for older browsers */
 article, aside, details, figcaption, figure, 
 footer, header, hgroup, menu, nav, section {
   display: block;
 }
 body {
   line-height: 1;
 }
 ol, ul {
   list-style: none;
 }
 blockquote, q {
   quotes: none;
 }
 blockquote:before, blockquote:after,
 q:before, q:after {
   content: '';
   content: none;
 }
 table {
   border-collapse: collapse;
   border-spacing: 0;
 }
    </style>
    <script type="module">
      import * as app from '/bundle.js';
    </script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`;

// Define route for root
router.get(/^\/$/, () => ({ body: SKELETON }));

const path = './lib/javascript/bundle.js';


// Define route for bundle
router.get(/\/bundle\.js/, async () => {
  const fileExists = await exists(path);

  if (fileExists) {
    const body = await readFileStr(path);

    return {
      headers: {
        'content-type': 'text/javascript'
      },
      body
    }
  } else {
    return {
      status: 404,
      body: '404: Not Found'
    }
  }
});

// Define route for 404
router.get(/^.*$/, () => ({
  status: 404,
  body: '404: Not Found'
}));

export default function main(
  req: ServerRequest,
) {
  router.run(req);
}
