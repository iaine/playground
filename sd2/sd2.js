/**
*  Main file to be called
*/
var SD2 = {};

//set up constants
const power = Math.pow(2, 1/12);

SD2 = {

  /* Kernel actions */
  kernel: function(id) {
    this.data = [];
    this.mapData = [];
    this.x = screen.width;
    this.y = screen.height;
    this.z = 295;
    this.commands = [];
    this.id = id;
    this.date = Date.now();
    this.startX = Math.floor(window.innerWidth/2);
    this.startY = Math.floor(window.innerHeight/2);
    this.tones = new Map();
    this.history = [];
  },

  /**
  *  Function to create a Map of tones to values
  *  Currently limimted to frequencies.
  */
  toneMap: function(mapKey, mapValue) {
    play.tones.set(mapKey, mapValue);
  },
  

  /*  Music algorithms */

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
  },

  /*  Spatial Algorithms */

  /**
  *  Function to map to an (x,y) position
  */
  panMap: function (screenDim, position, minMax) {
    let pos = (position < 0.0) ? -(1-(position/minMax.min)) :  (position/minMax.max);
    return screenDim * pos;
  },

  /* Data functions */

  /**
  *  Generic GET Function
  *
  */
  getData: function(url, callback) {

    function reqListener () {
      play.data = JSON.parse(this.responseText);
      callback();
    }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", url);
    oReq.send();

  },

  /**
  *  Function to get the minimum and maximum from a value
  *  @param{Array} searchArray - the array to be searched
  *  @param{String} searchKey - the key to be filtered in
  *  @return {Object}
  */
  getMinMax: function(searchKey) {

    let _tmp = [];

    play.data.forEach(d => {
      _tmp.push(d[searchKey]);
    });

    return {'min': Math.min(..._tmp), 'max': Math.max(..._tmp)};
  },

  /**
  *  Function to remap the data
  */
  mapData: function(keyArray) {
    let mapData = [];

    let _tmp = [];
    play.data.filter(d =>  _tmp.push({"x": d[keyArray[0]], "y":d[keyArray[1]], 'freq': d[keyArray[2]] }));
    play.data = _tmp.slice();
    return play.data;
  },

  /* Text algorithms */

  /**
  *  Reverses an object
  *
  *  A bug might be if the new String() method is
  *  Used as it comes in as an object but isn't
  *  an array, so reverse won't work
  */
  reverse : function(incomingdata) {
    if (typeof(incomingdata) == "object") {
      return incomingdata.reverse();
    }
    else if (typeof(incomingdata) == "string") {
      return incomingdata.split('').reverse().join('');
    } else {
     console.log("Cannot reverse " + incomingdata);
    }
  }

}; //end SD2

module.exports = SD2;
