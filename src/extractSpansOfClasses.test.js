import extractSpansOfClasses from './extractSpansOfClasses.js';

describe('extractSpansOfClasses', () => {
  const a = [0, 8]; a.className = 'a';
  const b = [8, 16]; b.className = 'b';
  const ab = [0, 16]; ab.className = 'ab';
  const abc = [0, 24]; abc.className = 'abc';
  const bc = [8, 16]; bc.className = 'bc';
  const a_b_c = [0, 24]; a_b_c.className = 'a b c';
  const value = "AAAAAAAABBBBBBBBCCCCCCCC";

  it('range: [a]', () => {
    let result = extractSpansOfClasses(value, [a]);
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty('text', 'AAAAAAAA');
    expect(result[0]).toHaveProperty('className', 'a');
  })
})
