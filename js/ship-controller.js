ShipController.MAX_Y = 5;
ShipController.MIN_Y = -5;

function ShipController () {
	this.ship= new Image();

	this.width = 0.7 * WIDTH;
	this.height = 0.9 * HEIGHT;

	this.x = -this.width + 200;
	this.y = WaveController.WAVE_HEIGHT_MULTIPLIER * HEIGHT - 0.9 * this.height;

	this.targetX = 0.1 * WIDTH;
	this.relativeY = 0;

	this.vx = 5;
	this.vy = 0.1;

	this.lastTick = Date.now();
	this.moveForward = true;
}

ShipController.prototype.initialize = function () {
	// Later resize this ship to reduce file size
	this.ship.src = "img/ship.png";

	/*
		t = current time
		b = start value
		c = change in value
		d = duration
	*/
	Math.easeInOutQuad = function (t, b, c, d) {
		t /= d / 2;
		if (t < 1) return c / 2 * t * t + b;

		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	};
};

ShipController.prototype.updateX = function (delta) {
	// Update position of ship here
	console.log(this.x, this.targetX - this.width);

	if (this.x > this.targetX - this.width && !this.moveForward) {
		this.x -= this.vx;
	} else if (this.x < this.targetX - this.width && this.moveForward) {
		this.x += this.vx;
	} else {
		return;
	}
};

ShipController.prototype.updateY = function (delta) {
	var oldY = this.y;

	if (this.relativeY > ShipController.MAX_Y || this.relativeY < ShipController.MIN_Y) {
		this.vy = -this.vy;
	}

	this.y += this.vy;
	this.relativeY += this.y - oldY;
};

ShipController.prototype.drawShip = function () {
	// Update tick
	var now = Date.now(),
		delta = now - this.lastTick;

	this.lastTick = now;

	// Update position X first
	this.updateX(delta);

	// Update position Y
	this.updateY(delta);

	// Draw ship image
	context.drawImage(this.ship, this.x, this.y, this.width, this.height);
};

ShipController.prototype.canvasResized = function () {
	this.width = 0.7 * WIDTH;
	this.height = 0.9 * HEIGHT;
	this.y = WaveController.WAVE_HEIGHT_MULTIPLIER * HEIGHT - 0.9 * this.height;
};