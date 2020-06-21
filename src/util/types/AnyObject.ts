/** @author Hans Oksendahl */
type AnyObject<
  A extends string | number | symbol,
  B extends any = any,
> = { [_ in A]: B };
