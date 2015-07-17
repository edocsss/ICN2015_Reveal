ShipController.MAX_Y = 6;
ShipController.MIN_Y = -6;

function ShipController () {
	this.ship= new Image();

	this.width = 0.5 * WIDTH;
	this.height = 0.7 * HEIGHT;

	this.x = -this.width + 0.01 * WIDTH;
	this.y = WaveController.WAVE_HEIGHT_MULTIPLIER * HEIGHT - 0.9 * this.height;

	this.targetX = 0.01 * WIDTH;
	this.relativeY = 0;

	this.maxRelativeY = 6;
	this.minRelativeY = -6;

	this.vx = 5;
	this.vy = 0.2;

	this.lastTick = Date.now();
	this.moveForward = true;

	this.draw = true;
}

ShipController.prototype.initialize = function () {
	// Later resize this ship to reduce file size
	this.ship.src = "img/ship.png";

	var randomizeMaxY = setInterval((function () {
		this.maxRelativeY = ShipController.MAX_Y + Math.sin(2 * Math.PI * r.random());
	}).bind(this), 1000 + 1000 * r.random());

	var randomizeMinY = setInterval((function () {
		this.minRelativeY = ShipController.MIN_Y + Math.sin(2 * Math.PI * r.random());
	}).bind(this), 1200 + 850 * r.random());

	var randomizeVy = setInterval((function () {
		this.vy += 0.01 * Math.sin(2 * Math.PI * r.random());
	}).bind(this), 500 + 300 * r.random());

	// Register click event for playing around with the ship
	$("#clicking-area").click((function (e) {
		if (e.pageY > $(".navbar-fixed-top").height()) {
			if (e.pageX > this.x + this.width) {
				this.targetX = e.pageX;
				this.moveForward = true;
			} else if (e.pageX < this.x) {
				this.targetX = e.pageX + this.width;
				this.moveForward = false;
			}
		}
	}).bind(this));
};

ShipController.prototype.updateX = function (delta) {
	// Update position of ship here
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

	if (this.relativeY > this.maxRelativeY || this.relativeY < this.minRelativeY) {
		this.vy = -this.vy;
	}

	this.y += this.vy;
	this.relativeY += this.y - oldY;
};

ShipController.prototype.drawShip = function () {
	if (this.draw) {
		// Update tick
		var now = Date.now(),
			delta = now - this.lastTick;

		this.lastTick = now;

		// Update position X first
		this.updateX(delta);

		// Update position Y
		this.updateY(delta);

		// Link to ticketing page if the ship has gone through the window
		if (this.x >= WIDTH) {
			console.log("REDIRECT");
			window.location = "ticket/index.php";
		}

		// Draw ship image
		context.drawImage(this.ship, this.x, this.y, this.width, this.height);
	}
};

ShipController.prototype.canvasResized = function () {
	this.width = 0.6 * WIDTH;
	this.height = 0.8 * HEIGHT;
	this.y = WaveController.WAVE_HEIGHT_MULTIPLIER * HEIGHT - 0.915 * this.height;
};