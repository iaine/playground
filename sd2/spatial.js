/**
*  Class for mapping to positions on screen  
*/

var Spatial;

Spatial = {
  
  /**
  *  Function to map to an (x,y) position
  */
  panMap: function (screenDim, position, minMax) {
    let pos = (position < 0.0) ? -(1-(position/minMax.min)) :  (position/minMax.max);
    return screenDim * pos;
  }
}


module.exports = Spatial;
