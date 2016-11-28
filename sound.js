// Create the audio context
var audioContext = new AudioContext();

// If you're using Safari
var audioContext = new webkitAudioContext();

/*------------  OSCILLATOR  ---------------*/

oscillator = context.createOscillator();

// Connect the oscillator to our speakers
oscillator.connect(context.destination);

// Start the oscillator now
oscillator.start(context.currentTime);

//Stop the oscillator 3 seconds from now
oscillator.stop(context.currentTime + 3);


