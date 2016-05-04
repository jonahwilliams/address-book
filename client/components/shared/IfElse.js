import React from 'react';
/* IfElse
 * @param {boolean} predicate
 * @param {[]JSX.Element} children
 * @returns {JSX.Element}
 */
export default function IfElse({ predicate, children, }) {
  if (predicate) {
    return children[0];
  }
  return children[1];
}
