import React from 'react';

/* Button
 * @param {Function} handleClick
 * @param {Array<JSX.Element>} children
 */
export default function Button({ handleClick, children })  {
  return (
    <div className='custom-button'
      onClick={handleClick}>
      { children }
    </div>
  );
}
