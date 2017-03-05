var scoreData = '{"notes": [ { "name": "C4", "midi": 60, "time": 0, "velocity": 0.9921259842519685, "duration": 1 }, { "name": "C4", "midi": 60, "time": 1, "velocity": 0.9921259842519685, "duration": 1 }, { "name": "G4", "midi": 67, "time": 2, "velocity": 0.9921259842519685, "duration": 1 }, { "name": "G4", "midi": 67, "time": 3, "velocity": 0.9921259842519685, "duration": 1 }, { "name": "A4", "midi": 69, "time": 4, "velocity": 0.9921259842519685, "duration": 1 }, { "name": "F4", "midi": 65, "time": 5, "velocity": 0.9921259842519685, "duration": 1 }, { "name": "A4", "midi": 69, "time": 6, "velocity": 0.9921259842519685, "duration": 1 }, { "name": "G4", "midi": 67, "time": 7, "velocity": 0.9921259842519685, "duration": 1 }, { "name": "F4", "midi": 65, "time": 9, "velocity": 0.9921259842519685, "duration": 1 }, { "name": "F4", "midi": 65, "time": 10, "velocity": 0.9921259842519685, "duration": 1 }, { "name": "E4", "midi": 64, "time": 11, "velocity": 0.9921259842519685, "duration": 1 }, { "name": "E4", "midi": 64, "time": 12, "velocity": 0.9921259842519685, "duration": 1 }, { "name": "D4", "midi": 62, "time": 13, "velocity": 0.9921259842519685, "duration": 1 }, { "name": "D4", "midi": 62, "time": 14, "velocity": 0.9921259842519685, "duration": 1 }, { "name": "C4", "midi": 60, "time": 15, "velocity": 0.9921259842519685, "duration": 2 } ]}';
// Create an SVG renderer and attach it to the DIV element named "boo".
var vf = new Vex.Flow.Factory({
    renderer: {
        selector: 'boo'
    }
});
var score = vf.EasyScore();
var system = vf.System();

function drawMusic(i) {
    var sheet = JSON.parse(scoreData).notes;
    var t = 0;
    var s = '';
    while (t < 4) {
        if (t > 0) {
            s += ', ';
        }
        s += sheet[i].name;
        s += '/';
        switch (sheet[i].duration) {
            case 1:
                s += 'q';
                break;
            case 2:
                s += 'h';
                break;
            case 4:
                s += 'w';
                break;
            case 0.5:
                s += '8';
                break;
            case 0.25:
                s += '16';
                break;
        }
        t += sheet[i].duration;
        i++;
    }

    system.addStave({
        voices: [
    score.voice(
                score.notes(s)
    )
  ]
    }).addClef('treble').addTimeSignature('4/4');


}

drawMusic(0);
vf.draw();


/* OLD VERSION - DOESN'T USE EASYSCALE

VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var div = document.getElementById("boo");
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(500, 500);
var context = renderer.getContext();
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

// Create a stave of width 400 at position 10, 40 on the canvas.
var stave = new VF.Stave(10, 40, 400);

// Add a clef and time signature.
stave.addClef("treble").addTimeSignature("4/4");

// Connect it to the rendering context and draw!
stave.setContext(context).draw();


var notesF = [];
var durs = {
    4: w,
    2: h,
    1: q,
    e: 0.5,
    s: 0.25
};
var notes = score.notes;
var len = notes.length;
var i;
for (i = 0; i < 2; i++) {
    var key = notes[i].name.charAt(0).toLowerCase() + "/" + notes[i].name.charAt(1);
    notesF.push(new VF.StaveNote({
        clef: "treble",
        keys: [key],
        duration: "h"
    }));
}
var voice = new VF.Voice({
    num_beats: 4,
    beat_value: 4
});

voice.addTickables(notesF);

var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

voice.draw(context, stave);*/
