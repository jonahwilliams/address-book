/* groupBy
 * @param {Array<T>} xs - Array of T
 * @param {T => Value} key - function from T to hashable type
 * @returns {Map[Value => Array<T>]}
 */
export default function groupBy(xs, key = (x) => x) {
  const result = new Map();
  for (const x of xs) {
    const k = key(x);
    result.set(k, (result.get(k) || []).concat(x));
  }
  return result;
}
