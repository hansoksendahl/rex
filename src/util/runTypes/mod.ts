/** @author Hans Oksendahl */
export default function isArray<T = any>(
  param: any,
): param is T[] {
  return Array.isArray(param);
}
