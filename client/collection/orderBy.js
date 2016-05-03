/* orderBy
 * @param {Array<T>} xs - an array of xs
 * @param {T => Value} key - function from T to comparable value type
 * @param {boolean} asc - ascending or descending
 * @returns {Array<T>}
 */
export default function orderBy(xs, key=(x) => x, asc=true) {
  if (asc) {
    return xs.sort((a, b) => key(a) > key(b));
  }
  return xs.sort((a, b) => key(a) < key(b));
}
