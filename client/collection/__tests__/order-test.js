jest.unmock('../orderBy');

import orderBy from '../orderBy';

describe('orderBy', () => {
  it('orders a list of letters', () => {
    const xs = ['c', 'a', 'b', 'a',];
    expect(orderBy(xs)).toEqual(['a', 'a', 'b', 'c',]);
  });

  it('orders a list of letters in reverse', () => {
    const xs = ['c', 'a', 'b', 'a',];
    expect(orderBy(xs, (x) => x, false)).toEqual(['c', 'b', 'a', 'a',]);
  });

  it('orders a list of numbers', () => {
    const xs = [9, 2, 3, 1, -1, 8, 6, ];
    expect(orderBy(xs)).toEqual([-1, 1, 2, 3, 6, 8, 9, ]);
  });

  it('orders a list of objects', () => {
    const xs = [
      { b: 2, },
      { b: 3, },
      { b: 1, },
    ];
    expect(orderBy(xs, (x) => x.b)).toEqual([
      { b: 1, },
      { b: 2, },
      { b: 3, },
    ]);
  });
});
