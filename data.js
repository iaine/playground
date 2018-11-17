/**
*  Function to run the code
*/

/*var serial = new serialise();

var runcode = function(codes) {

    let _obj = serial.serialiseToObj(codes);
    this[_obj.name].apply(this, _obj.value);
}*/

//needs error handling
function getData(url, callback) {

  function reqListener () {
    play.data = JSON.parse(this.responseText);
    callback();
  }

  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", url);
  oReq.send();

}

function get(url) {

  function reqListener () {
    play.data = JSON.parse(this.responseText);
  }

  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "data/" + url);
  oReq.send();
}

/**
*  
*/
function dataToNotes() {

   let pc1 = this.getMinMax('x');
   let pc2 = this.getMinMax('y');
   this.data.forEach( e => {
     let n = new Note();
     
     let _k = {'x': remapPostoScreen(play.startX, e.x, pc1), 'y' : remapPostoScreen(play.startY, e.y, pc2)};
     n.start(audioCtx, play.tones.get(e.freq), 1,  1, _k, 2 * mapObj.indexOf(e));
   });
}

function remapPostoScreen (screenDim, position, minMax) {
   let pos = (position < 0.0) ? -(1-(position/minMax.min)) :  (position/minMax.max);
   return screenDim * pos;
} 

/**
*  Function to remap the data
*/
function mapData(keyArray) {
  let mapData = [];
  //mapData = play.data;
  let _tmp = [];
  play.data.filter(d =>  _tmp.push({"x": d[keyArray[0]], "y":d[keyArray[1]], 'freq': d[keyArray[2]] }));
  play.data = _tmp.slice();
  return play.data;
}

/**
*  Function to create a Map of tones to values
*  Currently limimted to frequencies. 
*/
function toneMap(mapKey, mapValue) {
  play.tones.set(mapKey, mapValue);
}

/**
*  Function to get the minimum and maximum from a value
*  @param{Array} searchArray - the array to be searched
*  @param{String} searchKey - the key to be filtered in
*  @return {Object}
*/
function getMinMax(searchKey) {
  
  let _tmp = [];

  play.data.forEach(d => {
     _tmp.push(d[searchKey]); 
  });

  return {'min': Math.min(..._tmp), 'max': Math.max(..._tmp)};
}

//text
//A bug might be if the new String() method is 
//Used as it comes in as an object but isn't 
//an array, so reverse won't work
var reverse = function(incomingdata) {
  if (typeof(incomingdata) == "object") {
    return incomingdata.reverse();
  } 
  else if (typeof(incomingdata) == "string") {
    return incomingdata.split('').reverse().join('');
  } else {
    console.log("Cannot reverse " + incomingdata);
  }
}

//sound algorithms

//constants for this section
const power = Math.pow(2, 1/12);

/**
*  function to calculate a note frequency
*/
var calculateFreq = function(base, newnote) {
  return base * Math.pow(power, newnote);
}
