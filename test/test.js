// build time tests for flagmatic plugin
// see http://mochajs.org/

import { flagmatic } from '../src/client/flagmatic.js'
import expect from 'expect.js'

describe('flagmatic plugin', () => {
  describe('expand', () => {
    it('can make itallic', () => {
      // result = flagmatic.expand 'hello *world*'
      // expect(result).to.be 'hello <i>world</i>'
    })
  })
})
