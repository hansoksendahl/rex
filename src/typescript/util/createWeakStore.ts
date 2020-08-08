import { AnyObject, Keys, Lookup, Return } from "./types/mod.ts";
import getProp from './getProp.ts';

class WeakStore<
  T extends AnyObject,
  U extends AnyObject,
> {
  store: WeakMap<T, U>;
  getMethod: any;

  static of<V extends AnyObject, W extends AnyObject>() {
    return new WeakStore<V, W>()
  }

  constructor() {
    this.store = new WeakMap<T, U>();
    this.getMethod = getProp<U>().get;
  }

  get(
    identity: T,
  ) {
    return this.store.get(identity);
  }

  set(
    identity: T,
    value: U,
  ) {
    return this.store.set(identity, value);
  }

  has(
    identity: T,
  ) {
    return this.store.has(identity);
  }

  delete(
    identity: T,
  ) {
    return this.store.delete(identity);
  }

  setProp<
    V extends T,
    W extends Keys<U>,
    X extends U[W],
  >(
    identity: V,
    key: W,
    value: X,
  ) {
    const entry = this.store.get(identity) || Object.create(null);
    entry[key] = value;
    this.store.set(identity, entry);
  }
  
  getProp<
    V extends T,
    W extends Keys<U>
  >(
    identity: V,
    key: W,
  ): Lookup<U, W> | undefined {
    const entry = this.store.get(identity);

    return entry && entry[key];
  }

  hasProp(
    identity: T,
    key: Keys<U>,
  ) {
    const entry = this.store.get(identity);

    return entry && entry[key] !== void 0
  }

  deleteProp(
    identity: T,
    key: Keys<U>,
  ) {
    const entry = this.store.get(identity);

    if (entry) {
      delete entry[key];
    }
  }
}

export default WeakStore.of;