// Mersenne Twister
var r = new MersenneTwister();

// // Initialize Wave animation
var waveController = new WaveController();
waveController.initialize();

// // Initialize Flash animation
var flash = new Flash();

// // Initialize Lightning animation
var lightningController = new LightningController(flash);
lightningController.initialize();

// // Initialize Ship animation
var shipController = new ShipController();
shipController.initialize();

// Ship position
// var shipPositionMapping = [0.01 * WIDTH, 0.1 * WIDTH, 0.2 * WIDTH, 0.3 * WIDTH, 0.4 * WIDTH, 0.5 * WIDTH];
// var lastPosition = 0;

// Resize canvas event registration
$(window).resize(resizeCanvas);
resizeCanvas();

/************************************************/

// Set interval for redrawing canvas
var timeUpdateInterval = setInterval(drawCanvas, 1000 / 60);

function resizeCanvas (e) {
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	// Update ship position
	// shipPositionMapping = [0.01 * WIDTH, 0.1 * WIDTH, 0.2 * WIDTH, 0.3 * WIDTH, 0.4 * WIDTH, 0.5 * WIDTH];
	// shipController.targetX = shipPositionMapping[lastPosition];

	// Need this because Wave has some private constants
	waveController.canvasResized();

	// Update BASE_LIGHTNING_POSITION for LightningController
	lightningController.canvasResized();

	// Update ship's Y position
	shipController.canvasResized();
}

function drawCanvas () {
	// Clear canvas
	context.clearRect(0, 0, WIDTH, HEIGHT);

	// Draw lightning
	context.save();
	lightningController.drawLightning();
	context.restore();

	// Draw flash
	context.save();
	flash.drawFlash();
	context.restore();

	// Draw ship here!!
	context.save();
	shipController.drawShip();
	context.restore();

	// Draw wave
	context.save();
	waveController.drawWave();
	context.restore();
}