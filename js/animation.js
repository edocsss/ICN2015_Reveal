// Initialize Wave animation
var wave = new Wave();
wave.initialize();

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

// drawCanvas();

function resizeCanvas (e) {
	console.log(111);
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	// Need this because Wave has some private constants
	wave.canvasResized();
}

function drawCanvas () {
	// Clear canvas
	context.clearRect(0, 0, WIDTH, HEIGHT);

	// Draw wave
	//context.save();
	wave.drawWave();
}