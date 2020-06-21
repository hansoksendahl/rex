/** @author Hans Oksendahl */
export default function isArray(
  param: any,
): param is Array<any> {
  return Array.isArray(param);
}
