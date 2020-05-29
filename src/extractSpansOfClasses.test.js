import extractSpansOfClasses from './extractSpansOfClasses.js';

describe('extractSpansOfClasses', () => {
  const a = [0, 8]; a.className = 'a';
  const b = [8, 16]; b.className = 'b';
  const c = [16, 24]; c.className = 'c';
  const ab = [0, 16]; ab.className = 'ab';
  const abc = [0, 24]; abc.className = 'abc';
  const bc = [8, 24]; bc.className = 'bc';
  const a_b_c = [0, 24]; a_b_c.className = 'a b c';
  const aNoClass = [0, 8];
  const value = "AAAAAAAABBBBBBBBCCCCCCCC";

  it('range: [a]', () => {
    let result = extractSpansOfClasses(value, [a]);
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty('text', 'AAAAAAAA');
    expect(result[1]).toHaveProperty('text', 'BBBBBBBBCCCCCCCC');
    expect(result[0]).toHaveProperty('className', 'a');
    expect(result[1]).toHaveProperty('className', "");
    expect(result[0]).toHaveProperty('isMark', true);
    expect(result[1]).toHaveProperty('isMark', false);
  })

  it('range: [aNoClass]', () => {
    let result = extractSpansOfClasses(value, [aNoClass]);
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty('text', 'AAAAAAAA');
    expect(result[1]).toHaveProperty('text', 'BBBBBBBBCCCCCCCC');
    expect(result[0]).toHaveProperty('className', '');
    expect(result[1]).toHaveProperty('className', '');
    expect(result[0]).toHaveProperty('isMark', true);
    expect(result[1]).toHaveProperty('isMark', false);
  })

  it('range: [b]', () => {
    let result = extractSpansOfClasses(value, [b]);
    expect(result).toHaveLength(3);
    expect(result[0]).toHaveProperty('text', 'AAAAAAAA');
    expect(result[1]).toHaveProperty('text', 'BBBBBBBB');
    expect(result[2]).toHaveProperty('text', 'CCCCCCCC');
    expect(result[0]).toHaveProperty('className', '');
    expect(result[1]).toHaveProperty('className', 'b');
    expect(result[2]).toHaveProperty('className', '');
    expect(result[0]).toHaveProperty('isMark', false);
    expect(result[1]).toHaveProperty('isMark', true);
    expect(result[2]).toHaveProperty('isMark', false);
  })

  it('range: [ab, bc]', () => {
    let result = extractSpansOfClasses(value, [ab, bc]);
    expect(result).toHaveLength(3);
    expect(result[0]).toHaveProperty('text', 'AAAAAAAA');
    expect(result[1]).toHaveProperty('text', 'BBBBBBBB');
    expect(result[2]).toHaveProperty('text', 'CCCCCCCC');
    expect(result[0]).toHaveProperty('className', 'ab');
    expect(result[1]).toHaveProperty('className', 'ab bc');
    expect(result[2]).toHaveProperty('className', 'bc');
    expect(result[0]).toHaveProperty('isMark', true);
    expect(result[1]).toHaveProperty('isMark', true);
    expect(result[2]).toHaveProperty('isMark', true);
  })

  it('range: [c]', () => {
    let result = extractSpansOfClasses(value, [c]);
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty('text', 'AAAAAAAABBBBBBBB');
    expect(result[0]).toHaveProperty('className', "");
    expect(result[1]).toHaveProperty('className', "c");
    expect(result[0]).toHaveProperty('isMark', false);
    expect(result[1]).toHaveProperty('isMark', true);
  })

  [ 'a', 'aNoClass', 'a_b_c', 'ab', 'abc', 'b', 'bc', 'c' ]

  it('range: [a, b, abc, c, ab, bc, a_b_c, aNoClass]', () => {
    let result = extractSpansOfClasses(value, [a, b, abc, c, ab, bc, a_b_c, aNoClass]);
    expect(result).toHaveLength(3);
    expect(result[0]).toHaveProperty('text', 'AAAAAAAA');
    expect(result[1]).toHaveProperty('text', 'BBBBBBBB');
    expect(result[2]).toHaveProperty('text', 'CCCCCCCC');
    expect(result[0]).toHaveProperty('className', 'a a_b_c ab abc');
    expect(result[1]).toHaveProperty('className', 'a_b_c ab abc b bc');
    expect(result[2]).toHaveProperty('className', 'a_b_c abc bc c');
    expect(result[0]).toHaveProperty('isMark', true);
    expect(result[1]).toHaveProperty('isMark', true);
    expect(result[2]).toHaveProperty('isMark', true);
  })
})
