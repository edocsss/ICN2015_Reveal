ShipController.MAX_Y = 10;
ShipController.MIN_Y = -10;

function ShipController () {
	this.ship= new Image();
	this.width = 850;
	this.height = 549;	
	this.x = -this.width + 10;
	this.y = HEIGHT - this.height - 20;
	this.targetX = 10;
	this.relativeY = 0;
	this.vx = 5;
	this.vy = 0.5;
}

ShipController.prototype.initialize = function () {
	// Later resize this ship to reduce file size
	this.ship.src = "img/ship.png";
};

ShipController.prototype.updateX = function () {
	// Update position of ship here
	if (this.x > this.targetX - this.width) {
		this.x -= this.vx;
	} else if (this.x < this.targetX - this.width) {
		this.x += this.vx;
	} else {
		return;
	}
};

ShipController.prototype.updateY = function () {
	var oldY = this.y;

	if (this.relativeY > ShipController.MAX_Y || this.relativeY < ShipController.MIN_Y) {
		this.vy = -this.vy;
	}

	this.y += this.vy;
	this.relativeY += this.y - oldY;
};

ShipController.prototype.drawShip = function () {
	// Update position X first
	this.updateX();

	// Update position Y
	this.updateY();

	// Draw ship image
	context.drawImage(this.ship, this.x, this.y, 850, this.height);
};