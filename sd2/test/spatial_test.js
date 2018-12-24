var assert = require("assert");
var S = require("../sd2.js");


describe('Spatial', function(){
  describe('Module S', function(){
    it('should have a panMap Method', function(){
      assert.equal(typeof S, 'object');
      assert.equal(typeof S.panMap, 'function');
    })
  })
});

describe('Mapping 2 dimensions', function() {
  it('Should map', function() {
     assert.equal(S.panMap(200, 50, {'min': 20, 'max':50}), -20);
  });
});
