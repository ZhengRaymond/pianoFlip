var score = JSON.parse(scoreData);

VF = Vex.Flow;

var renderer1 = new VF.Renderer(document.getElementById("display1"), VF.Renderer.Backends.SVG);
renderer1.resize(660, 500);

// var renderer2 = new VF.Renderer(document.getElementById("display2"), VF.Renderer.Backends.SVG);
// renderer2.resize(500, 500);

// var context2 = renderer2.getContext();
// context2.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
// var stave2 = new VF.Stave(10, 40, 400);
// stave2.addClef("treble").addTimeSignature("4/4");
// stave2.setContext(context2).draw();

var durationValues = {
    0.75: 'q',
    1.5: 'h',
    3: '3',
    0.375: '8',
    0.1875: '16'
}


function drawMusic(block, my_renderer) {
    var my_context = my_renderer.getContext();
    my_context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
    var my_stave = new VF.Stave(10, 40, 650);
    my_stave.addClef("treble").addTimeSignature("4/4");
    my_stave.setContext(my_context).draw();
    my_stave.drawVerticalBar(345, true);
    var redNode = 0;
    var code = [];
    var index = 0;
    for (; index < score.notes.length; index++) {
        if (score.notes[index].time >= block * 3) {
            break;
        }
    }
    while (true) {
        if (index >= score.notes.length || score.notes[index].time >= block * 3 + 6) {
            break;
        }

        var options = {
            clef: "treble",
            keys: [],
            duration: durationValues[score.notes[index].duration]
        }

        var noteTime = score.notes[index].time;
        do {
            var noteName = score.notes[index].name.toLowerCase();
            if (noteName.charAt(1) == "#") {
                noteName = noteName.charAt(0) + noteName.charAt(1) + "/" + noteName.charAt(2);
            }
            else {
                noteName = noteName.charAt(0) + "/" + noteName.charAt(1);
            }
            options.keys.push(noteName);
            index++;
        } while (index < score.notes.length && score.notes[index].time == noteTime);


        // TODO: Implement Accidentals for chords: https://github.com/0xfe/vexflow/wiki/The-VexFlow-Tutorial
        var newNote;
        if (noteName == "a#/4") {
            options.keys[0] = "bb/4";
            newNote = new VF.StaveNote(options).addAccidental(0, new VF.Accidental("b"));
        }
        else if (noteName.charAt(1) == "#") {
            console.log("Accidental");
            newNote = new VF.StaveNote(options).addAccidental(0, new VF.Accidental("#"));
        }
        else {
            newNote = new VF.StaveNote(options);
        }
        if (index - 1 < loc - 1) {
            redNode ++;
            // newNote.setStyle({ strokeStyle: "red", fillStyle: "red"});
        }
        code.push(newNote);
    }
    var beams = VF.Beam.generateBeams(code);
    if (loc != 0) code[redNode].setStyle({ strokeStyle: "red", fillStyle: "red"});
    Vex.Flow.Formatter.FormatAndDraw(my_context, my_stave, code);
    beams.forEach(function(b) {console.log("Beam: " + b); b.setContext(my_context).draw()})
    return my_context;
}

// var lastContext = drawMusic(2, renderer1);
// lastContext.clear();
// drawMusic(1, renderer1);

// drawMusic(1, context2, stave2);



/* OLD VERSION - DOESN'T USE EASYSCALE

VF = Vex.Flow;

// Create an SVG renderer1 and attach it to the DIV element named "boo".
var div = document.getElementById("boo");
var renderer1 = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer1.resize(500, 500);
var context = renderer1.getContext();
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
