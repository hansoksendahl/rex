import { diff, AbstractChildren, createWeakStore } from '../../../util/mod.ts';
import { createElement, createText } from '../mod.ts';
import {
  NodeKeys,
  AbstractNode,
  AbstractElement,
  AbstractText,
  AbstractProperties,
  AbstractComponent,
  isText,
  isComponent,
  isElement,
} from '../../../util/mod.ts';
import routeAttributes from './routeAttributes.ts';
import routeStyles from './routeStyles.ts';
import routeEvents from './routeEvents.ts';
import { Methods, MemoEntry, ElementWithStyle } from './types.ts';
import isNode from '../../../util/vdom/isNode.ts';

// This is a top level weak map where references to nodes will be stored.
const store = createWeakStore<AbstractNode, MemoEntry>();

/**
 * Evluate whether two nodes refer to the same element.
 * @param prev 
 * @param next 
 */
function isNodeEqual(
  prev?: AbstractNode | null,
  next?: AbstractNode | null,
) {
  if ((!prev || !next) || (prev && prev.type) !== (next && next.type)) {
    return false;
  } else if (isText(prev) && isText(next)) {
    return prev.value === next.value;
  } else if (isElement(prev) && isElement(next)) {
    return (
      prev.namespace === next.namespace &&
      prev.tag === next.tag
    );
  } else if (isComponent(prev) && isComponent(next)) {
    return prev.component === next.component;
  }

  return false;
}

/**
 * Get the attributes of a node if possible otherwise create an empty object.
 * @param abstractNode 
 */
function getProperties(
  abstractNode: AbstractNode | void,
) {
  return (
    abstractNode &&
    isElement(abstractNode) &&
    abstractNode.properties
  ) || ({} as AbstractProperties);
}

/**
 * Get the the children of a node if possible otherwise create an empty array.
 * @param abstractNode 
 */
function getChildren(
  abstractNode: AbstractNode | void,
) {
  return (
    abstractNode &&
    !isText(abstractNode) &&
    abstractNode.children
  )
    ? abstractNode.children
    : [];
}

function getNodes(
  nodes: AbstractNode | AbstractChildren
) {
  return isNode(nodes)
    ? [nodes]
    : nodes;
}

/**
 * Recursively walk the abstract dom-tree represented by `next`. At each node
 * compare it to the abstract dom-tree represented by `prev`.
 * 
 * @param parent 
 * @param next 
 * @param prev 
 */
export default function domTreeMutate(
  parent: Element,
  maybeNext: AbstractNode | AbstractChildren,
  hooks: Methods,
  maybePrev: AbstractNode | AbstractChildren = [],
) {
  const nextNodes = getNodes(maybeNext);
  const nextNodesLength = nextNodes.length;
  const prevNodes = getNodes(maybePrev);
  const prevNodesLength = prevNodes.length;
  const nodesLength = Math.max(nextNodesLength, prevNodesLength);

  for (let i = 0; i < nodesLength; i += 1) {
    let nextNode = nextNodes[i];
    let prevNode = prevNodes[i];

    if (i < nextNodesLength) {
      // Is this a component?
      if (isComponent(nextNode)) {
        // Get the previous memoized result
        const prevNodeResult = store.getProp(prevNode, 'node');
        // Evaluate the component
        hooks.onInit(nextNode);
        const nextNodeResult = nextNode.component({
          ...nextNode.properties,
          children: nextNode.children,
        });

        // Store the evaluated component
        store.setProp(
          nextNode,
          'node',
          nextNodeResult,
        );
        // Recurse
        domTreeMutate(
          parent,
          nextNodeResult,
          hooks,
          prevNodeResult,
        )
      } else {
        const prevElement = store.getProp(prevNode, 'element');
        const nodeIsEqual = isNodeEqual(prevNode, nextNode);
        let nextElement: Element | Text;

        // Are the two nodes equal?
        if (!isNodeEqual(prevNode, nextNode)) {
          if (isText(nextNode)) {
            // Create a text node
            nextElement = createText(nextNode.value);
          } else {
            // Create a namespaced element
            nextElement = createElement(nextNode.namespace, nextNode.tag);
          }

          // Memoize the node
          store.setProp(nextNode, 'element', nextElement);
          
          if (prevElement) {
            parent.replaceChild(nextElement, prevElement)
          } else {
            parent.appendChild(nextElement)
          }
        } else {
          nextElement = prevElement!;

          store.setProp(nextNode, 'element', nextElement);
        }

        if (isElement(nextNode)) {
          const prevProps: AbstractProperties = prevNode && nodeIsEqual
            ? getProperties(prevNode)
            : {};
          const prevChildren = prevNode && nodeIsEqual
            ? getChildren(prevNode)
            : [];
          const nextProps: AbstractProperties = getProperties(nextNode);
          const nextChildren = getChildren(nextNode);
          const {
            style: prevStyles = {},
            ...prevAttr
          } = prevProps;
          const {
            style: nextStyles = {},
            ...nextAttr
          } = nextProps;
          const attrPatches = diff(prevAttr, nextAttr);
          const stylePatches = diff(prevStyles, nextStyles);

          if (attrPatches) {
            for (let attrPatch of attrPatches) {
              const { type, key, value } = attrPatch;

              if (key === '_') {
                if (prevElement !== nextElement) {
                  value(nextElement);
                }
              } else if (key.indexOf('on') === 0) {
                const eventName = key.substr(2);
                
                routeEvents(
                  type,
                  [
                    nextElement! as Element,
                    eventName,
                    value,
                  ]
                );
              } else {
                if (value) {
                  routeAttributes(
                    type,
                    [
                      nextNode.namespace,
                      nextElement! as Element,
                      key,
                      value
                    ],
                  );
                }
              }
            }
          }

          if (stylePatches) {
            for (let { type, key, value } of stylePatches) {
              routeStyles(
                type,
                [
                  nextElement! as ElementWithStyle,
                  key,
                  value,
                ]
              )
            }
          }

          domTreeMutate(
            nextElement as Element,
            nextChildren,
            hooks,
            prevChildren
          )
        }
      }
    } else {
      const prevNode = prevNodes[i];
      const prevElement = store.getProp(prevNode, 'element');
      
      if (prevElement) {
        parent.removeChild(prevElement);
      }
    }
  }
  // let prev: AbstractElement | AbstractText | null;
  // let prevElement: Element | Text | null;
  // let next: AbstractElement | AbstractText;
  // let nextElement: Element | Text;

  // prev = memoGet(maybePrev!, 'node');
  // prevElement = memoGet(maybePrev!, 'element');

  // if (isComponent(maybeNext)) {
  //   let nextOrComponent = maybeNext.component({ ...maybeNext.properties, children: maybeNext.children });
  //   hooks.onInit(nextOrComponent);
  //   hooks.onEnter();

  //   while (nextOrComponent.type === NodeKeys.Component) {
  //     nextOrComponent = nextOrComponent.component({ ...nextOrComponent.properties, children: nextOrComponent.children });
  //     hooks.onInit(nextOrComponent);
  //     hooks.onEnter();
  //   }
    
    
    
  //   next = nextOrComponent;
  // } else {
  //   next = maybeNext;
  // }

  // const nodeIsEqual = isNodeEqual(prev, next)

  // memoSet(maybeNext, 'node', next);

  // if (!nodeIsEqual) {
  //   if (isText(next)) {
  //     nextElement = createText(next.value);
  //   } else {
  //     nextElement = createElement(next.namespace, next.tag);
  //   }
    
  //   memoSet(maybeNext, 'element', nextElement);

  //   if (prevElement) {
  //     parent.replaceChild(nextElement, prevElement);      
  //   } else {
  //     parent.appendChild(nextElement);
  //   }
  // } else if (prevElement !== null) {
  //   nextElement = prevElement;

  //   memoSet(maybeNext, 'element', nextElement);
  // }

  // if (isElement(next)) {
  //   const prevProps: AbstractProperties = prev && nodeIsEqual ? getProperties(prev) : {};
  //   const nextProps: AbstractProperties = getProperties(next);
  //   const prevChildren = prev && nodeIsEqual ? getChildren(prev) : [];
  //   const nextChildren = getChildren(next);

  //   const {
  //     style: prevStyles = {},
  //     ...prevAttr
  //   } = prevProps;
  //   const {
  //     style: nextStyles = {},
  //     ...nextAttr
  //   } = nextProps;

  //   const attrPatches = diff(prevAttr, nextAttr);
  //   const stylePatches = diff(prevStyles, nextStyles);

  //   // console.log('nextProps', nextProps, 'stylePatches': stylePatches);

  //   if (attrPatches) {
  //     for (let attrPatch of attrPatches) {
  //       const { type, key, value } = attrPatch;

  //       if (key.indexOf('on') === 0) {
  //         const eventName = key.substr(2);
          
  //         routeEvents(
  //           type,
  //           [
  //             nextElement! as Element,
  //             eventName,
  //             value,
  //           ]
  //         );
  //       } else {
  //         if (value) {
  //           routeAttributes(
  //             type,
  //             [
  //               next.namespace,
  //               nextElement! as Element,
  //               key,
  //               value
  //             ],
  //           );
  //         }
  //       }
  //     }
  //   }

  //   if (stylePatches) {
  //     for (let { type, key, value } of stylePatches) {
  //       routeStyles(
  //         type,
  //         [
  //           nextElement! as ElementWithStyle,
  //           key,
  //           value,
  //         ]
  //       )
  //     }
  //   }
    
  //   const nextChildrenLength = nextChildren.length;
  //   const childrenLength = Math.max(prevChildren.length, nextChildren.length);

  //   for (let i = 0; i < childrenLength; i++) {
  //     const prevChild = prevChildren[i];

  //     if (i < nextChildrenLength && isNodeEqual(next, prev)) {
  //       let nextChild = nextChildren[i];

  //       domTreeMutate(
  //         nextElement! as Element,
  //         nextChild,
  //         hooks,
  //         prevChild,
  //       );
  //     } else if (prevChild) {
  //       const prevChildElement = memoGet(prevChild, 'element');
  //       const prevChildNode = memoGet(prevChild, 'node');

  //       if (prevChildElement && nodeIsEqual) {
  //         nextElement!.removeChild(prevChildElement);
  //       }
  //     }
  //   }
  // }

  // hooks.onNext();
}