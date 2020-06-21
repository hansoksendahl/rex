/** @author Hans Oksendahl */
export default function isFunction(
  param: any & Function,
): param is Function {
  return typeof param === 'function';
}
