import vdomMutate from './vdomMutate/mod.ts';
import {
  AbstractNode,
  AnyFunction,
  createWeakStore,
  AnyObject,
  AnyArray,
  isShallowEqual,
  createComponent,
  AbstractChildren,
  AnyChild,
} from '../../util/mod.ts';

// 🐉 HERE BE DRAGONS 🐉
// =====================

export interface ElementState {
  created?: number;
  states: AnyArray;
  effects: AnyArray;
  stateIndex: number;
  effectIndex: number;
}

const store = createWeakStore<AbstractNode, ElementState>();

export default function createRenderer() {
  let time: number;
  let isInLoop = false;
  let currentNode: AbstractNode | null = null;
  const states = new WeakMap();

  const hooks = {
    onInit: (
      node: AbstractNode,
    ) => {
      if(!store.hasProp(node, 'created')) {
        store.set(
          node,
          {
            created: performance.now(),
            states: [],
            effects: [],
            stateIndex: 0,
            effectIndex: 0,
          }
        );
      } else {
        store.setProp(
          node,
          'stateIndex',
          0,
        );
        store.setProp(
          node,
          'effectIndex',
          0,
        )
      }

      currentNode = node;
    },
    onEnter: () => {
      
    },
    onExit: () => {

    },
    onNext: () => {
      currentNode = null;
    },
  };

  const useEffect = (
    enterHandler: AnyFunction,
    dependencies: AnyArray,
  ) => {
    const node = currentNode!;
    const effects = store.getProp(node, 'effects')!;
    const effectIndex = store.getProp(node, 'effectIndex')!;
    const effect = effects[effectIndex];

    if (effect) {
      const isEqual = isShallowEqual(effect.dependencies, dependencies);

      if (!isEqual) {
        if (effect.exit) {
          effect.exit();
        }

        effects[effectIndex] = {
          exit: enterHandler(...dependencies),
          dependencies,
        }

        store.setProp(node, 'effects', effects);
      }
    } else {
      effects[effectIndex] = {
        exit: enterHandler(...dependencies),
        dependencies,
      }

      store.setProp(node, 'effects', effects);
    }

    store.setProp(
      node,
      'effectIndex',
      effectIndex + 1
    );
  }

  const createContext = () => {
    const provider =
      ({
        children, value
      }: { children: AnyChild, value: any }) => {
        const [state] = useState(value)

        return children;
      }
  }

  const useTime = () => {
    return store.getProp(currentNode!, 'created')!;
  }

  const useState = (
    initialValue: any,
  ) => {
    const node = currentNode!;
    const states = store.getProp(node, 'states')!;
    const stateIndex = store.getProp(node, 'stateIndex')!;
    const lookup = states[stateIndex];
    let value: any;

    const setState = (val: any) => {
      states[stateIndex] = val;
    }
    
    if (lookup === void 0) {
      value = initialValue;
      setState(value);
    } else {
      value = lookup;
    }

    store.setProp(
      node,
      'stateIndex',
      stateIndex + 1
    );
    return [value, setState];
  }

  function start<
    T extends Element,
    U extends AbstractNode,
  >(
    container: T,
    nextTree: U,
  ) {
    let tree: AbstractNode;

    isInLoop = true;

    function renderLoop(
      now: number
    ) {
      time = now;

      vdomMutate(
        container,
        nextTree,
        hooks,
        tree
      );

      if (isInLoop) {
        window.requestAnimationFrame(renderLoop);
      }

      tree = nextTree;
    }

    renderLoop(performance.now());
  }

  function stop() {
    isInLoop = false;
  }

  return {
    useEffect,
    useState,
    useTime,
    start,
    stop,
  }
}
