/**
*  Main file to be called
*/
//set up constants
const power = Math.pow(2, 1/12);


  /**
  *  to create a Map of tones to values
  *  Currently limimted to frequencies.
  */
  var toneMap  = function (mapKey, mapValue) {
    play.tones.set(mapKey, mapValue);
  }
  

  /*  Music algorithms */

  /**
  *  to calculate a note frequency
  *  https://pages.mtu.edu/~suits/NoteFreqCalcs.html
  */
  var calculateNewNote = function (base, newnote) {
    return base * Math.pow(power, newnote);
  }

  /**
  *  Calculate Frequency value
  *  f = 2 ^ (d-69)/12 * 440 Hz
  */
  var calculateFrequency = function (midiNote) {
    return Math.pow(2, ((midiNote-69)/12)) * 440;
  }

  /*  Spatial Algorithms */

  /**
  *  to map to an (x,y) position
  */
  var panMap = function (screenDim, position, minMax) {
    let pos = (position < 0.0) ? -(1-(position/minMax.min)) :  (position/minMax.max);
    return screenDim * pos;
  }

  /* Data functions */

  /**
  *  Generic GET Function
  *
  */
  var getData = function (url, callback) {

    function reqListener () {
      play.data = JSON.parse(this.responseText);
      callback();
    }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", url);
    oReq.send();

  }

  /**
  *  to get the minimum and maximum from a value
  *  @param{Array} searchArray - the array to be searched
  *  @param{String} searchKey - the key to be filtered in
  *  @return {Object}
  */
  var getMinMax = function (searchKey) {

    let _tmp = [];

    play.data.forEach(d => {
      _tmp.push(d[searchKey]);
    });

    return {'min': Math.min(..._tmp), 'max': Math.max(..._tmp)};
  }

  /**
  *  to remap the data
  */
  var mapData = function (keyArray) {
    let mapData = [];

    let _tmp = [];
    play.data.filter(d =>  _tmp.push({"x": d[keyArray[0]], "y":d[keyArray[1]], 'freq': d[keyArray[2]] }));
    play.data = _tmp.slice();
    return play.data;
  }

  /* Text algorithms */

  /**
  *  Reverses an object
  *
  *  A bug might be if the new String() method is
  *  Used as it comes in as an object but isn't
  *  an array, so reverse won't work
  */
  var reverse = function (incomingdata) {
    if (typeof(incomingdata) == "object") {
      return incomingdata.reverse();
    }
    else if (typeof(incomingdata) == "string") {
      return incomingdata.split('').reverse().join('');
    } else {
     console.log("Cannot reverse " + incomingdata);
    }
  }

/**
 *  Method to split a string and return a count
 * @param textStrDiv
 * @returns {object}
 */
var wordCount = function (textStrDiv) {
    let textDiv = document.getElementById(textStrDiv);
    var wordObj = new Object();
    var splitStr = textStr.split(' ');

    splitStr.forEach(function (x) {
        if (!wordObj[x]) {
            wordObj[x] = 1
        } else {
            wordObj[x]++
        }
    });

    return wordObj;
};
