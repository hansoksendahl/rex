/**
 * Reusable hunk of code for processing children and properties
 * @param params 
 * @param node 
 */
export default function processParams(
  params: any[],
  node: any = {},
) {
  switch(params.length) {
    case 2: {
      const [properties, children] = params;

      node.properties = properties;
      node.children = children;
      break;
    }
    case 1: {
      const [param] = params;

      if (Array.isArray(param)) {
        node.children = param;
      } else {
        node.properties = param;
      }

      break;
    }
  }

  return node;
}