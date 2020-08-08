import { DiffKeys, createRoute } from '../../../util/mod.ts';

type AnyFunction<T extends any = any> = (..._: any[]) => T;

function createListener(
  element: Element,
  eventName: string,
  handler: AnyFunction,
) {
  element.addEventListener(eventName, handler);
}

function removeListener(
  element: Element,
  eventName: string,
  handler: AnyFunction,
) {
  element.removeEventListener(eventName, handler);
}

export default createRoute({
  [DiffKeys.create]: createListener,
  [DiffKeys.remove]: removeListener,
  [DiffKeys.update](
    element: Element,
    eventName: string,
    handler: AnyFunction,
    previousHandler: AnyFunction,
  ) {
    // no-op up in this...

    // > Get your event handler creation out of my render loop!
    // >
    // > - Hans (author)
    removeListener(
      element,
      eventName,
      previousHandler,
    )
    createListener(
      element,
      eventName,
      handler,
    )
  }
})