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
setInterval(clock, 10);
var timePerBeat = 0;
var noteCount = 0;
var lastNoteTime = 0;

var score;
var loc = 0;
var lastContext;

function process(key) {
    if (key === false || time - lastNoteTime > 2000) {
        time = 0;
        noteCount = 0;
        timePerBeat = 0;
        lastNoteTime = time;
    }
    else if (time - lastNoteTime < 300 && noteCount < 50){
        if (noteCount > 2) {
            var diff = time - lastNoteTime;
            var avg = timePerBeat / (noteCount - 1);
            if (Math.abs(diff - avg) / avg < 0.2) {
                timePerBeat += time - lastNoteTime;
                noteCount++;
            }
        }
        else {
            if (noteCount == 0) {
                noteCount++;
            }
            else if (noteCount == 1) {
                timePerBeat = time - lastNoteTime;
                noteCount++;
            }
            else if (noteCount == 2) {
               var diff = time - lastNoteTime;
               if (Math.abs(diff - timePerBeat) / timePerBeat < 0.4) {
                   timePerBeat = timePerBeat + diff;
                   noteCount++;
               }
               else {
                   noteCount = 0;
                   timePerBeat = 0;
               }
            }
        }
    }

    lastNoteTime = time;
    if (noteCount > 3 && timePerBeat > 5) {
        document.getElementById("infoBPM").innerHTML = "BPM: " + Math.round(600000 / (timePerBeat / (noteCount - 1))) / 100 + " beats per minute.";
    }
    else {
        document.getElementById("infoBPM").innerHTML = "BPM: Calculating...";
    }

    document.getElementById("infoLocation").innerHTML = "Location: " + loc;
    document.getElementById("infoBeat").innerHTML = "Beat: " + score.notes[loc].time * 4/3;
    var lastValue;
    if (loc == 0) {
        lastValue = "N/A";
    } else {
        lastValue = score.notes[loc - 1].name;
    }
    document.getElementById("infoLastNote").innerHTML = "Last Note: " + lastValue;
    var nextValue;
    if (loc == score.notes.length - 2) {
        nextValue = "End of song.";
    } else {
        nextValue = score.notes[loc + 1].name;
    }
    document.getElementById("infoNextNote").innerHTML = "Next Note: " + nextValue;
}

function process2(key) {
    // End of song
    if (loc >= score.notes.length) {
        return;
    }

    try {
        if (key.charAt(1) == "s") {
            key = key.charAt(0) + "#" + key.charAt(2);
        }
        if (score.notes[loc].name == key) {
            console.log("TRUE: " + key);
            loc++;
        }
        else if (score.notes[loc + 1].name == key) {
            console.log("TRUE: " + key);
            loc += 2;
        }
        else if (score.notes[loc + 2].name == key) {
            console.log("TRUE: " + key);
            loc += 3;
        }
        else if (score.notes[loc - 1].name == key) {
            console.log("TRUE: " + key);
            // loc stay the same
        }
        else if (score.notes[loc - 2].name == key) {
            console.log("TRUE: " + key);
            loc -= 1;
        }
    } catch (err) {
        // console.log("Error: " + err);
        // console.log("        Out of bounds in process2.");
    }
    lastContext.clear();
    if (loc == 0) {
        lastContext = drawMusic(Math.floor(score.notes[loc].time / 3), renderer1);
    }
    lastContext = drawMusic(Math.floor(score.notes[loc - 1].time / 3), renderer1);
}

function process3(key) {

}


function buildScore() {
    score = JSON.parse(scoreData);
    lastContext = drawMusic(0, renderer1);
}