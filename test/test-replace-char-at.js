/* global describe it */
var replaceCharAt = require('../lib/replace-char-at')
var expect = require('chai').expect

describe('replaceCharAt', function () {
  it('should remove the char at the specified index', function () {
    expect(replaceCharAt('abcd', 0, 1)).to.eql('1bcd')
    expect(replaceCharAt('abcd', 1, 1)).to.eql('a1cd')
    expect(replaceCharAt('abcd', 2, 1)).to.eql('ab1d')
    expect(replaceCharAt('abcd', 3, 1)).to.eql('abc1')
  })
})
