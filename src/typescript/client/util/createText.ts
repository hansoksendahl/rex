import { D } from './constants.ts';

/**
 * Crete a text node
 * @param content 
 */
export default function createText(
  content: string | number
) {
  return D.createTextNode(`${content}`);
}