/**
 *  Top level file to handle the algorithms
 *
 *  Methods to handle all tags
 *
 *  @todo: refactor to use the sd2 library
 */

//shared variables
var allTags = [];

//filter key
var filterTags =  "";

//filter for tags
var tag = "";

//sonification parameters
let note = {
    'Freq':'',
    'Dur':'',
    'Vol': 0.5,
    'X': 0,
    'Y': 0,
    'Z':100
};

/**
 *  Method to move the tags according to the filter
 *  whilst playing the other data in the centre
 *
 *  If no filter, sonify all tags
 */
var showTags = function (alignment) {
    sel = document.getElementById("selectednote");
    const filnote = sel.innerHTML;
    let allCtx = new AudioContext();
    // @todo: fix the panning
    let alignx = (alignment == "LeftTroll") ? -0.75 : 0.75;

    let id = 0;
    if (allTags.length < 1) {
        function reqListener () {
            allTags = JSON.parse(this.responseText);
            let width = Math.floor(window.innerWidth/2);

            allTags.forEach(tag => {
                let not = new Note();

                //start(audioContext, frequency, note_length, volume, x, id)
                if (tag.account_category == alignment) {
                    //not.start(allCtx, filnote, 0.1, 0.5, alignx, ++id);
                    not.start(allCtx, note.Freq, note.Dur, note.Vol, alignx, ++id);
                } else {
                    not.start(allCtx, 261.25, 0.1, 0.5, 0, ++id);
                }
            });
        }

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", "cut.json");
        oReq.send();
    } else {

        let width = Math.floor(window.innerWidth/2);

        //let alignx = (alignment == "LeftTroll") ? -0.75 : 0.75;
        allTags.forEach(tag => {
            let not = new Note();
            //start(audioContext, frequency, note_length, volume, x, id)
            console.log("Account " + tag.account_category);
            if (tag.account_category == alignment) {
                not.start(allCtx, 261.25, 0.1, 0.5, alignx, ++id);
            } else {
                not.start(allCtx, 261.25, 0.1, 0.5, 0, ++id);
            }
        });
    }
}

/**
 *
 * @returns {this | this | this | this | this | void | this | this | this | this | this | this | this}
 */
var showDescendingTags = function() {

    let sortedtags = tagslist['tags'].sort(function (a,b) { b.count - a.count });
    return sortedtags;
}
/**
 *  Use Pan to create a set of concentric circles
 *  using the tags
 *
 *  @todo: Fix the tagslist
 */
var concentricTags = function() {
    let aCtx1 = new AudioContext();
    let _id = 0;

    let srttags = showDescendingTags();

    srttags.forEach( function (y) {

        let tmpval = y.count / tagslist['count'];
        let position = -1 + tmpval; // calculate position from an edge

        let n = new Note();
        let vol = 0.1 + tmpval;

        freq = calculateFrequency(261.25, vol);
        //start(audioContext, frequency, note_length, volume, x, id
        n.start(aCtx1, freq, vol, vol, position, (2 * ++_id), echo=true);
        let alignPos = (position > -.5) ? "remove-tags-right" : "remove-tags-left";

        tags.innerHTML += '<p id="'+ alignPos +'">' + y.name + '</p>';
    });

}

/**
 * Function to find the word position to set up the tweet pan position
 */
var findTagPosition = function() {
    var id = 0;
    // @todo: fix the internal representation
    _d['tags'].forEach( function (t) {
        xPos += 2;
        note = new Note();
        //start(frequency, note_length, volume, xPos, id)
        let stringpos = t.indexOf(tag);
        // Move the frequency
        // Using the interval formula: fn = f0 * (a)n
        let temp = Math.floor(stringpos / 10);
        let interval = calculateNewNote(261.25,temp);

        let pos = (stringpos < 70) ? -(1-(stringpos/twitter_length)) :  (stringpos/twitter_length);
        note.start(aCtx, interval, 1.0, 5, pos, (2 * ++id));
        tags.innerHTML += '<p>'+t+'</p>'
    });
}

/**
 * Algorithm to place the pan for the tags against the
 * count
 *
 * @param inverse
 */
var positionByCount = function(inverse=false) {

    id = 0;
    let notes = [];
    tagslist['tags'].filter( function(x) { notes.push(x.count) });

    notes.forEach( function(n) {
        let dur = (inverse) ? 1 + (n/tagslist["count"]) : (n/tagslist["count"]);
        let vol =  ((n/tagslist["count"]) < 0.0) ? 0.1 : (n/tagslist["count"]);

        not = new Note();
        not.start(audioCtx, 440.00 , dur, vol, ++id)
    });
}

// todo: try the two tones
// code from https://www.redblobgames.com/x/1618-webaudio/
function adsr(T, a, d, s, r, sustain) {
    var gainNode = audioCtx.createGain();
    function set(v, t) { gainNode.gain.linearRampToValueAtTime(v, T + t); }
    set(0.0, -T);
    set(0.0, 0);
    set(1.0, a);
    set(sustain, a + d);
    set(sustain, a + d + s);
    set(0.0, a + d + s + r);
    return gainNode;
}