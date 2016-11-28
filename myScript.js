// Buffer Loader Class
function BufferLoader(context, urlList, callback) {
    this.context = context;
    thisurlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function() {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
            request.response,
            function(buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                if(++loader.loadCount == loader.urlList.length){
                    loader.onload(loader.bufferList);
                }
                    
            },
            function(error) {
                console.error('decodeAudioData error', error);
            }
        );
    }
    request.onerror = function() {
        alert('BufferLoader: XHR error');
    }
    request.send();
}



// Create an audiocontext
window.onload = init;
var context;
var bufferLoader;
window.addEventListener('load', init, false);
function init() {
//   try{
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        context = new AudioContext();
        bufferLoader = new BufferLoader(
            context,
            [
                '/sounds/gamesound.wav',
             ],
            finishedLoading
        );
        bufferLoader.load;
//    }
/*    
    catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
*/
}

// Loading Sounds
var dogBarkingBuffer = null;
// Fix up prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

function loadDogSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            dogBarkingBuffer = buffer;
        }, onError);
    }
    request.send();
}

function playSound(buffer, time) {
    var source = context.createBufferSource(); // creates sound source
    source.buffer = buffer; // tells source which sound to play
    source.connect(context.destination); // connect source to context's destination (speakers)
    source.start(time); // play source
}

function finishedLoading(bufferList) {
    // Create two sources and play them both together
    var source1 = context.createBufferSource();
    var source2 = context.createBufferSource();
    source1.buffer = bufferList[0];
    source2.buffer = bufferList[1];

    source1.connect(context.destination);
    source2.connect(context.destination);
    source1.start(0);
    source2.start(0);
}

var RhythmSample = {};

RhythmSample.play = function() {
    function playSound(buffer, time) {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        if (!source.start) {
            source.start = source.noteOn;
        }
        source.start(time);
    }


var kick = BUFFERS.kick;
var snare = BUFFERS.snare;
var hihat = BUFFERS.hihat;

// We'll start playing the rhythm 100 miliseconds from "now"
var startTime = context.currentTime + 0.100;
var tempo = 80; // BPM (beats per minute)
var eighthNoteTime = (60 / tempo) / 2;

// Play 2 bars of the following:
for (var bar = 0; bar < 2; bar++) {
    var time = startTime + bar * 8 * eighthNoteTime;
    // Play the bass (kick) drum on beats 1, 5
    playSound(kick, time);
    playSound(kick, time + 4 * eighthNoteTime);

    // Play the snare drum on beats 3, 7
    playSound(snare, time + 2 * eighthNoteTime);
    playSound(snare, time + 6 * eighthNoteTime);

    // Play the hi-hat every eighth note
    for (var i = 0; i < 8; ++i) {
        playSound(hihat, time + i * eighthNoteTime);
    }
}
}
