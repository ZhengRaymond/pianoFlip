/**
 * Created by Riv on 3/4/2017.
 */

var KEYS = {};
KEYS["C"] = 12;
KEYS["Cs"] = 13;
KEYS["D"] = 14;
KEYS["Ds"] = 15;
KEYS["E"] = 16;
KEYS["F"] = 17;
KEYS["Fs"] = 18;
KEYS["G"] = 19;
KEYS["Gs"] = 20;
KEYS["A"] = 21;
KEYS["As"] = 22;
KEYS["B"] = 23;

function MIDIEntry() {
    var myMIDIEntry = {
        type: "",
        location: 0.0,
        duration: 0.0,
        note: 0,
        prev: null,
        next: null
    }
    return myMIDIEntry;
}

var time = 0;
function clock() {
    time++;
}
setInterval(clock, 100);
var timePerBeat;
var lastNoteTime = 0;

function process(key) {
    if (key === false) {
        time += 200;
    }
    if (time - lastNoteTime > 200) { // restart

    }
    console.log(key);
}

function buildScore() {
    var score = JSON.parse(scoreData);
    var currIndex = 0;

    // console.log(score.notes[0].name);
    // console.log(score.notes[0].time);
    // console.log(score.notes[0].duration);
}