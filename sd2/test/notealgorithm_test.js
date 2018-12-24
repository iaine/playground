var assert = require("assert");
let A = require("../sd2.js");


describe('NoteAlgorithm', function(){
  describe('Module A', function(){
    it('should have a calculateFrequency Method', function(){
      assert.equal(typeof A, 'object');
      assert.equal(typeof A.calculateFrequency, 'function');
      assert.equal(typeof A.calculateNewNote, 'function');
    })
  })
});

describe('Calculate Differences between notes', function() {
  it('Calculate C5', function() {
     assert.equal(Math.floor(A.calculateNewNote(440, 3)), 523);
  });
});

describe('Calculate Frequency to Midi', function() {
  it('Midi to Hertz', function() {
     assert.equal(Math.floor(A.calculateFrequency(69)), 440);
  });
});

