// Mersenne Twister
var r = new MersenneTwister();

// Initialize Wave animation
var waveController = new WaveController();
waveController.initialize();

// Initialize Flash animation
var flash = new Flash();

// Initialize Lightning animation
var lightningController = new LightningController(flash);
lightningController.initialize();

// Initialize Ship animation
var shipController = new ShipController();
shipController.initialize();

// Background image
var background = new Image();
background.src = "img/background.svg";

// Ship position
var shipPositionMapping = [0.1 * WIDTH, 0.3 * WIDTH, 0.5 * WIDTH, 0.6 * WIDTH, 0.7 * WIDTH, 0.9 * WIDTH];
var lastPosition = 0;

// Resize canvas event registration
$(window).resize(resizeCanvas);
resizeCanvas();

// Register mouse events for Wave animation
// $(canvas).mousemove(wave.mouseMove.bind(wave));
// $(canvas).mousedown(wave.mouseDown.bind(wave));
// $(canvas).mouseup(wave.mouseUp.bind(wave));

/************************************************/

// Set interval for redrawing canvas
var timeUpdateInterval = setInterval(drawCanvas, 1000 / 40);

function resizeCanvas (e) {
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	// Update ship position
	shipPositionMapping = [0.1 * WIDTH, 0.3 * WIDTH, 0.5 * WIDTH, 0.6 * WIDTH, 0.7 * WIDTH, 0.9 * WIDTH];
	shipController.targetX = shipPositionMapping[lastPosition];

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