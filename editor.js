/**
*  Set up constants
*/
//editor functions
var edit = '';
//error functions
var error = '';
//print data functions
var print = '';
//AudioContext
var audioCtxt = new AudioContext();
//initialise playground
var play = '';

var editor = '';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Playground = function () {
  function Playground() {
    _classCallCheck(this, Playground);

    this.data = [];
    this.mapData = [];
    this.x = this.getX();
    this.y = this.getY();
    this.z = 295;
    this.commands = [];
    this.id = Date.now();
    this.startX = Math.floor(window.innerWidth/2);
    this.startY = Math.floor(window.innerHeight/2);
    this.tones = new Map();
    this.history = [];
  }

  _createClass(Playground, [{
    key: "getX",
    value: function getX() {
      return screen.width;
    }
  }, {
    key: "getY",
    value: function getY() {
      return screen.height;
    }
  }]);

  return Playground;
}();

var toggleEdit = function (button, tagId) {
    var x = document.getElementById(tagId);
    if (x.contentEditable == "true") {
        x.contentEditable = "false";
        button.innerHTML = "Enable editor";
    } else {
        x.contentEditable = "true";
        button.innerHTML = "Disable editor";
    }
}

//initialise the editor
var initEditor = function(divId) {
   console.log("Editor loaded");
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");

   editor.on("blur", compile);
   //edit = document.getElementById(divId);
   //edit.contentEditable = "true";
   error = document.getElementById("error");
   print = document.getElementById("print");
   play = new Playground();
}

/**
*  Method to clear the various boxes of data
*/
var clearAll = function() {
   edit.innerHTML = '';
   error.innerHTML = 'Show Errors';
   print.innerHTML = 'Show Data';
}

/**
*  Method to print data to the edit screen
*  If fade is true, sets the fade class for CSS3 fade away
*/
var showData = function(data, fade=false) {
    if (typeof(data) == "object") {
      print.innerHTML = JSON.stringify(data);
    } else {
      print.innerHTML = data;
    }
    print.classList.add("fade");
}

/**
*  Method to run the code and 
*/
var compile = function() {

   try {
     let code = editor.getValue();
     //clear the existing errors;
     error.innerHTML = '';
     //let code = edit.textContent;
      console.log(code);
     //todo: consider if returns are caught and printed to screen
     // existing thought goes with not yet. Concentrating on audio
     eval(code);
   } catch (err) {
     console.log(err);
     error.innerHTML = err;
   }
}
