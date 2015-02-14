# build time tests for flagmatic plugin
# see http://mochajs.org/

flagmatic = require '../client/flagmatic'
expect = require 'expect.js'

describe 'flagmatic plugin', ->

  describe 'expand', ->

    it 'can make itallic', ->
      result = flagmatic.expand 'hello *world*'
      expect(result).to.be 'hello <i>world</i>'
