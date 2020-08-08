import { setAttribute, removeAttribute } from '../mod.ts';
import { createRoute, DiffKeys } from '../../../util/mod.ts';

export default createRoute({
  [DiffKeys.create]: setAttribute,
  [DiffKeys.remove]: removeAttribute,
  [DiffKeys.update]: setAttribute,
});