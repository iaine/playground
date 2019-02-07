/**
*  Initialise the editor
*  Loads the editor variable
*/

var editor = '';
var notes = '';
var cmd = '';

//holder for session string
var session = '';

 var initEditor = function(divId) {
   editor = ace.edit("editor");
   editor.setTheme("ace/theme/monokai");
   editor.session.setMode("ace/mode/javascript");

   editor.on("blur", compile);
   cmd = document.getElementById("console");
};


/**
*  Method to print data to the edit screen
*  If fade is true, sets the fade class for CSS3 fade away
*/
  var showData = function(data, fade=false) {
    if (typeof(data) == "object") {
        cmd.innerHTML = JSON.stringify(data);
    } else {
        cmd.innerHTML = data;
    }
    cmd.classList.add("fade");
};

/**
 * Function to call the code from the url
 * @param code
 */
var setCode = function(code) {

    let _code = window[code].toString();
    _code += "\n" + setFakeCodeLine(code);

    if (!editor) { initEditor('edit'); }
    editor.setValue(_code, 1);
    editor.clearSelection();
  };

/**
 * Function to return the main codeline to run it
 * @param codeline
 * @returns {string}
 */
var setFakeCodeLine = function (codeline) {
    switch(codeline) {
        case 'showTags':
            return codeline + '("leftTroll")';
            break;
        case 'concentricTags':
        case 'findTagPosition':
            return  codeline + '()';
            break;
        default:
            break;
    }
}

/**
 * Function to set the UUID as a session key
 * Mainly used for the file system. Perhaps needs linking to log in
 * @param sessionStr
 */
var setSession = function(sessionStr) {
    session = sessionStr;
}

/**
 * Function to get the current session key.
 * @returns {string}
 */
var getSession = function() {
    return session;
}
/**
*  Method to run the code and
*/
 var compile = function() {

   try {
       let code = editor.getValue();
       //clear the existing errors;
       cmd.innerHTML = '';

       // store the code using the session key to list the files
       storeData(code);
       //@todo: consider if returns are caught and printed to screen
       // existing thought goes with not yet. Concentrating on audio
       eval(code);
   } catch (err) {
       console.log(err);
       cmd.innerHTML = err;
   }
};

/**
 * PUT request to send code and session to the file system for storage
 * @param code
 */
var storeData = function (code) {

   let data = {};
   data.code = code;
   data.session = session;
   let json = JSON.stringify(data);

   let xhr = new XMLHttpRequest();
   xhr.open('PUT', '/', true);
   
   xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
   xhr.onload = function() {
	var users = JSON.parse(xhr.responseText);
	if (xhr.readyState === 4 && xhr.status == "200") {
		console.table(users);
	} else {
		console.error(users);
	}
   };
   xhr.send(json);
};

