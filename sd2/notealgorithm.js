/**
*  Generic music algorithms
*/

  //constants for this section
  const power = Math.pow(2, 1/12);

var NoteAlgorithm = {};

NoteAlgorithm = {
  
  //constants for this section
  //const power = Math.pow(2, 1/12);

  /**
  *  function to calculate a note frequency
  *  https://pages.mtu.edu/~suits/NoteFreqCalcs.html
  */
  calculateNewNote : function(base, newnote) {
    return base * Math.pow(power, newnote);
  }, 

  /**
  *  Calculate Frequency value
  *  f = 2 ^ (d-69)/12 * 440 Hz
  */
  calculateFrequency : function(midiNote) {
    return Math.pow(2, ((midiNote-69)/12)) * 440;
  }


}

module.exports = NoteAlgorithm;
