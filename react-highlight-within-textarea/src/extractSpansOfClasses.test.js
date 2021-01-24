import renderer from 'react-test-renderer'
import extractSpansOfClasses from './extractSpansOfClasses.js'

describe('extractSpansOfClasses', () => {
  const a = [0, 8]; a.className = 'a'
  const b = [8, 16]; b.className = 'b'
  const c = [16, 24]; c.className = 'c'
  const ab = [0, 16]; ab.className = 'ab'
  const abc = [0, 24]; abc.className = 'abc'
  const bc = [8, 24]; bc.className = 'bc'
  const a_b_c = [0, 24]; a_b_c.className = 'a b c' // eslint-disable-line camelcase

  const aNoClass = [0, 8]
  const value = 'AAAAAAAABBBBBBBBCCCCCCCC'

  it('range: [a]', () => {
    const result = extractSpansOfClasses(value, [a])
    expect(result).toHaveLength(2)
    expect(result[0]).toHaveProperty('text', 'AAAAAAAA')
    expect(result[1]).toHaveProperty('text', 'BBBBBBBBCCCCCCCC')
    expect(result[0]).toHaveProperty('className', 'a')
    expect(result[1]).toHaveProperty('className', '')
    expect(result[0]).toHaveProperty('isMark', true)
    expect(result[1]).toHaveProperty('isMark', false)
  })

  it('range: [aNoClass]', () => {
    const result = extractSpansOfClasses(value, [aNoClass])
    expect(result).toHaveLength(2)
    expect(result[0]).toHaveProperty('text', 'AAAAAAAA')
    expect(result[1]).toHaveProperty('text', 'BBBBBBBBCCCCCCCC')
    expect(result[0]).toHaveProperty('className', '')
    expect(result[1]).toHaveProperty('className', '')
    expect(result[0]).toHaveProperty('isMark', true)
    expect(result[1]).toHaveProperty('isMark', false)
  })

  it('range: [b]', () => {
    const result = extractSpansOfClasses(value, [b])
    expect(result).toHaveLength(3)
    expect(result[0]).toHaveProperty('text', 'AAAAAAAA')
    expect(result[1]).toHaveProperty('text', 'BBBBBBBB')
    expect(result[2]).toHaveProperty('text', 'CCCCCCCC')
    expect(result[0]).toHaveProperty('className', '')
    expect(result[1]).toHaveProperty('className', 'b')
    expect(result[2]).toHaveProperty('className', '')
    expect(result[0]).toHaveProperty('isMark', false)
    expect(result[1]).toHaveProperty('isMark', true)
    expect(result[2]).toHaveProperty('isMark', false)
  })

  it('range: [ab, bc]', () => {
    const result = extractSpansOfClasses(value, [ab, bc])
    expect(result).toHaveLength(3)
    expect(result[0]).toHaveProperty('text', 'AAAAAAAA')
    expect(result[1]).toHaveProperty('text', 'BBBBBBBB')
    expect(result[2]).toHaveProperty('text', 'CCCCCCCC')
    expect(result[0]).toHaveProperty('className', 'ab')
    expect(result[1]).toHaveProperty('className', 'ab bc')
    expect(result[2]).toHaveProperty('className', 'bc')
    expect(result[0]).toHaveProperty('isMark', true)
    expect(result[1]).toHaveProperty('isMark', true)
    expect(result[2]).toHaveProperty('isMark', true)
  })

  it('range: [c]', () => {
    const result = extractSpansOfClasses(value, [c])
    expect(result).toHaveLength(2)
    expect(result[0]).toHaveProperty('text', 'AAAAAAAABBBBBBBB')
    expect(result[0]).toHaveProperty('className', '')
    expect(result[1]).toHaveProperty('className', 'c')
    expect(result[0]).toHaveProperty('isMark', false)
    expect(result[1]).toHaveProperty('isMark', true)
  })

  it('range: [a, b, abc, c, ab, bc, a_b_c, aNoClass]', () => {
    const result = extractSpansOfClasses(value, [a, b, abc, c, ab, bc, a_b_c, aNoClass])
    expect(result).toHaveLength(3)
    expect(result[0]).toHaveProperty('text', 'AAAAAAAA')
    expect(result[1]).toHaveProperty('text', 'BBBBBBBB')
    expect(result[2]).toHaveProperty('text', 'CCCCCCCC')
    expect(result[0]).toHaveProperty('className', 'a ab abc b c')
    expect(result[1]).toHaveProperty('className', 'a ab abc b bc c')
    expect(result[2]).toHaveProperty('className', 'a abc b bc c')
    expect(result[0]).toHaveProperty('isMark', true)
    expect(result[1]).toHaveProperty('isMark', true)
    expect(result[2]).toHaveProperty('isMark', true)
  })
})

describe('extractSpansOfClasses.span.render', () => {
  const bNoClass = [8, 16]
  const c = [16, 24]; c.className = 'c'
  const value = 'AAAAAAAABBBBBBBBCCCCCCCC'

  it('span', () => {
    const result = extractSpansOfClasses(value, [bNoClass, c])
    const component = renderer.create(result[0].render())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('mark noclass', () => {
    const result = extractSpansOfClasses(value, [bNoClass, c])
    const component = renderer.create(result[1].render())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('mark withclass', () => {
    const result = extractSpansOfClasses(value, [bNoClass, c])
    const component = renderer.create(result[2].render())
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
