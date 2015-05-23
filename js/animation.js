// Initialize Wave animation
var waveController = new WaveController();
waveController.initialize();

// Initialize Lightning animation
var lightningController = new LightningController();
lightningController.initialize();

// Resize canvas event registration
$(window).resize(resizeCanvas);
resizeCanvas();

// Register mouse events for Wave animation
// $(canvas).mousemove(wave.mouseMove.bind(wave));
// $(canvas).mousedown(wave.mouseDown.bind(wave));
// $(canvas).mouseup(wave.mouseUp.bind(wave));

/************************************************/

// Set interval for redrawing canvas
var timeUpdateInterval = setInterval(drawCanvas, 40);

function resizeCanvas (e) {
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	// Need this because Wave has some private constants
	waveController.canvasResized();
}

function drawCanvas () {
	// Clear canvas
	context.clearRect(0, 0, WIDTH, HEIGHT);

	// Draw lightning
	context.save();
	lightningController.drawLightning();
	context.restore();

	// Draw ship here!!

	// Draw wave
	context.save();
	waveController.drawWave();
	context.restore();
}