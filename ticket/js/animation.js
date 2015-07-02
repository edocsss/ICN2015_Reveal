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

// Resize canvas event registration
$(window).resize(resizeCanvas);
resizeCanvas();

/************************************************/

// Set interval for redrawing canvas
var timeUpdateInterval = setInterval(drawCanvas, 1000 / 40);

function resizeCanvas (e) {
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	console.log("WIDTH: " + WIDTH);

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

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