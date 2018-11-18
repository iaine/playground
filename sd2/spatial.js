/**
*  Class for mapping to positions on screen  
*/

class Spatial {
  
  /**
  *  Function to map to an (x,y) position
  */
  var panMap =  function (screenDim, position, minMax) {
    let pos = (position < 0.0) ? -(1-(position/minMax.min)) :  (position/minMax.max);
    return screenDim * pos;
  }
}
