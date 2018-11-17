var Note = function() {
  function Note(audioContext) {
    this.context = audioContext;
    console.log('aCtx');
    console.log(this.context);
  }

  function start(audioContext, frequency, note_length, volume, pos, id) {
//let context = audioContext;
this.context = audioContext;
console.log(id);
console.log(frequency);
let y = (play.startY + pos.y);
let x = (play.startX + pos.x)

let listener = this.context.listener;



// Create static position for the listener
if(listener.forwardX) {
  listener.forwardX.value = 0;
  listener.forwardY.value = 0;
  listener.forwardZ.value = -1;
  listener.upX.value = 0;
  listener.upY.value = 1;
  listener.upZ.value = 0;
} else {
  listener.setOrientation(0,0,-1,0,1,0);
}

if(listener.positionX) {
  listener.positionX.value = pos.x;
  listener.positionY.value = play.startY;
  listener.positionZ.value = play.z;
} else {
  listener.setPosition(pos.x,play.startY,play.z);
}

/*let panner = this.context.createPanner();
panner.panningModel = 'HRTF';
panner.distanceModel = 'inverse';
panner.refDistance = 1;
panner.maxDistance = 10000;
panner.rolloffFactor = 1;
panner.coneInnerAngle = 360;
panner.coneOuterAngle = 0;
panner.coneOuterGain = 0;

if(panner.orientationX) {
  panner.orientationX.value = 1;
  panner.orientationY.value = 0;
  panner.orientationZ.value = 0;
} else {
  panner.setOrientation(1,0,0);
}

  //move the panning position
  if(panner.positionX) {

    panner.positionX.value = play.startX + pos.x;
    panner.positionY.value = play.startY + pos.y;
    panner.positionZ.value = 100;
  } else {
    panner.setPosition(play.startX + pos.x,play.startY + pos.y,100);
  }

  //let panner = this.context.createStereoPanner();
  //panner.pan.setValueAtTime(x, id);
*/
      let oscillator = this.context.createOscillator();

      //let osc2 = this.context.createOscillator();  

      let gainNode = this.context.createGain();
      gainNode.connect(this.context.destination);
      gainNode.gain.setValueAtTime(volume, id);
      oscillator.detune.value = 100;
      //osc2.detune.value = 100;
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(frequency, id);
      oscillator.frequency.exponentialRampToValueAtTime(frequency, id + 0.03);
      oscillator.start(id);
      oscillator.stop(id + note_length);

      /*osc2.frequency.setValueAtTime((2 * frequency), id);
      osc2.frequency.exponentialRampToValueAtTime(2*frequency, id + 0.03);
      osc2.start(id);
      osc2.stop(id + note_length);*/
      //osc2.connect(this.context.destination);

      //connect all the parts up now
      oscillator.connect(this.context.destination);
      //osc2.connect(panner);
      gainNode.connect(this.context.destination);
      //panner.connect(this.context.destination);
  };

  return {
    start:start
  }  
};
