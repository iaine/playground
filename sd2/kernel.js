/**
 * Function to hold the Browser data
 *
 */

var kernel = function () {
    this.data = [];
    this.mapData = [];
    this.x = screen.width;
    this.y = screen.height;
    this.z = 295;
    this.commands = [];
    this.id = Date.now();
    this.startX = Math.floor(window.innerWidth/2);
    this.startY = Math.floor(window.innerHeight/2);
    this.tones = new Map();
    this.history = [];
  };
