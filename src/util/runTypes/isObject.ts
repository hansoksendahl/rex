/** @author Hans Oksendahl */
export default function isObject(
  param: any,
): param is Object {
  return typeof param === 'object';
}
