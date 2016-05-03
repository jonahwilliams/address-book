jest.unmock('../groupBy');

import groupBy from '../groupBy';

describe('groupBy', () => {
  it('groups a list of letters', () => {
    const xs = ['a', 'b', 'c', 'd', 'b', 'c'];
    expect(groupBy(xs)).toEqual(
      new Map([['a', ['a']],['b', ['b', 'b']],['c', ['c', 'c']],['d', ['d']]]));
  });

  it('groups a list of numbers', () => {
    const xs = [1, 1, 3];
    expect(groupBy(xs)).toEqual(
      new Map([[1, [1, 1]], [3, [3]]])
    );
  });

  it('groups a list of objects', () => {
    const xs = [
      { f: 2 },
      { f: 3 },
      { f: 2 }
    ];
    expect(groupBy(xs, (x) => x.f)).toEqual(
      new Map([[2 , [{f: 2}, {f: 2}]], [3, [{f: 3}]]])
    );
  });
});
