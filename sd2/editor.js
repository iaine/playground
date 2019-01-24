/**
*  Initialise the editor
*  Loads the editor variable
*/

var editor = '';
var notes = '';

 var initEditor = function(divId) {
   editor = ace.edit("editor");
   editor.setTheme("ace/theme/monokai");
   editor.session.setMode("ace/mode/javascript");

   editor.on("blur", compile);
   var error = document.getElementById("error");
   var print = document.getElementById("print");
   //play = new Playground();
};

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
};

  var setCode = function(code) {

  let _code = window[code].toString();
  //let _code = "calculateNewNote(base, newnote) { return base * Math.pow(power, newnote); }"

  if (!editor) { initEditor('edit'); }
  editor.setValue(_code, 1);
  editor.clearSelection();
};

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
     storeData(code);
     //todo: consider if returns are caught and printed to screen
     // existing thought goes with not yet. Concentrating on audio
     eval(code);
   } catch (err) {
     console.log(err);
     error.innerHTML = err;
   }
};


/**
*  PUT request
*
*/
var storeData = function (code) {

   let data = {};
   data.code = code;
   let json = JSON.stringify(data);

   let xhr = new XMLHttpRequest();
   xhr.open('PUT', '/', true);
   
   xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
   xhr.onload = function() {
	var users = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "200") {
		console.table(users);
	} else {
		console.error(users);
	}
   };
   xhr.send(json);
};

