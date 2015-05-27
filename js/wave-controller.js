/* Wave properties (STATIC VARIABLES) */
WaveController.DENSITY = 0.75;
WaveController.FRICTION = 1.14;
WaveController.MOUSE_PULL = 0.07;
WaveController.AOE = 100;
WaveController.DETAIL = Math.round(WIDTH / 60);
WaveController.WATER_DENSITY = 1.07;
WaveController.AIR_DENSITY = 1.02;
WaveController.WAVE_HEIGHT_MULTIPLIER = 0.735;

function WaveController () {
	this.mouseIsDown = false;
	this.ms = {
			x: 0,
			y: 0
		};

	this.mp = {
			x: 0,
			y: 0
		};

	this.particles = [];
}

/* Method Definitions */
WaveController.prototype.initialize = function () {
	this.particles = [];

	// Generate wave particles
	for (var i = 0; i < WaveController.DETAIL + 1; i++) {
		this.particles.push({
			x: WIDTH / (WaveController.DETAIL - 4) * (i - 2),
			y: HEIGHT * 0.5,
			original: {
				x: 0,
				y: HEIGHT * WaveController.WAVE_HEIGHT_MULTIPLIER
			},
			velocity: {
				x: 0,
				y: 1 + r.random() * 3
			},
			force: {
				x: 0,
				y: 0
			},
			mass: 10
		});
	}

	// setInterval variables
	var twitchInterval1 = setInterval(this.twitch1.bind(this), 1500 + 300 * Math.sin(r.random())),
		twitchInterval2 = setInterval(this.twitch2.bind(this), 1000 + 300 * Math.sin(r.random())),
		twitchInterval3 = setInterval(this.twitch3.bind(this), 1300 + 700 * Math.sin(r.random()));
};

WaveController.prototype.twitch1 = function () {
	//this.ms.x = 0;
	//this.ms.y = 0;

	var forceRange = 2 + r.random();
	this.insertImpulse(0.25 * WIDTH + 60 * Math.sin(2 * Math.PI * r.random()) * r.random(), 0.05 + (r.random() * (forceRange * 2) - forceRange));
};

WaveController.prototype.twitch2 = function () {
	//this.ms.x = 0;
	//this.ms.y = 0;

	var forceRange = 2 + r.random();
	this.insertImpulse(0.5 * WIDTH + 100 * Math.cos(2 * Math.PI * r.random()) * r.random(), 0.08 + (r.random() * (forceRange * 2) - forceRange));
};

WaveController.prototype.twitch3 = function () {
	//this.ms.x = 0;
	//this.ms.y = 0;

	var forceRange = 2 + r.random();
	this.insertImpulse(0.75 * WIDTH + 75 * Math.sin(2 * Math.PI * r.random()) * r.random(), 0.06 + (r.random() * (forceRange * 2) - forceRange));
};

WaveController.prototype.insertImpulse = function (positionX, forceY) {
	var particle = this.particles[Math.round(positionX / WIDTH * this.particles.length)];

	if (particle) {
		for (var i = 0; i < 1.5 * forceY; i++) {
			particle.force.y += 0.5;
		}
	}
};

WaveController.prototype.drawWave = function () {
	var gradientFill = context.createLinearGradient(WIDTH * 0.5, HEIGHT * WaveController.WAVE_HEIGHT_MULTIPLIER, WIDTH * 0.5, HEIGHT),
		len = this.particles.length,
		current,
		previous,
		next;
	
	gradientFill.addColorStop(0,'#6180B5');
	// gradientFill.addColorStop(0.1,'#4B6694');
	// gradientFill.addColorStop(0.2,'#4B6694');
	// gradientFill.addColorStop(0.3,'#4B6694');
	// gradientFill.addColorStop(0.4,'#4B6694');
	// gradientFill.addColorStop(0.5,'#4B6694');
	// gradientFill.addColorStop(0.6,'#4B6694');
	// gradientFill.addColorStop(0.7,'#3D557D');
	// gradientFill.addColorStop(0.8,'#32476B');
	// gradientFill.addColorStop(0.9,'#4B6694');
	gradientFill.addColorStop(1,'#233656');

	context.fillStyle = gradientFill;
	context.beginPath();
	context.moveTo(this.particles[0].x, this.particles[0].y);

	for (var i = 0; i < len; i++) {
		current = this.particles[i];
		previous = this.particles[i - 1];
		next = this.particles[i + 1];

		if (previous && next) {
			var forceY = 0,
				prevY = current.y;

			forceY += -WaveController.DENSITY * (previous.y - current.y);
			forceY += WaveController.DENSITY * (current.y - next.y);
			forceY += WaveController.DENSITY / 15 * (current.y - current.original.y);

			current.velocity.y += -(forceY / current.mass) + current.force.y;
			current.velocity.y /= WaveController.FRICTION;
			current.force.y /= WaveController.FRICTION;
			current.y += current.velocity.y;

			var distance = this.distanceBetween(this.mp, current);
			if (distance < WaveController.AOE) {
				distance = this.distanceBetween(this.mp, {
					x: current.original.x,
					y: current.original.y
				});

				this.ms.x = this.ms.x * 0.98;
				this.ms.y = this.ms.y * 0.98;

				current.force.y += (WaveController.MOUSE_PULL * (1 - (distance / WaveController.AOE))) * this.ms.y;
			}

			//console.log(previous.y, current.y);
			context.quadraticCurveTo(previous.x, previous.y, previous.x + (current.x - previous.x) / 2, previous.y + (current.y - previous.y) / 2);
		}
	}

	context.lineTo(this.particles[this.particles.length - 1].x, this.particles[this.particles.length - 1].y);
	context.lineTo(WIDTH, HEIGHT);
	context.lineTo(0, HEIGHT);
	context.lineTo(this.particles[0].x, this.particles[0].y);
	context.fill();
};

WaveController.prototype.mouseMove = function (e) {
	this.ms.x = Math.max(Math.min(e.layerX - this.mp.x, 15), -40);
	this.ms.y = Math.max(Math.min(e.layerY - this.mp.y, 15), -40);

	this.mp.x = e.layerX;
	this.mp.y = e.layerY;
};

WaveController.prototype.mouseDown = function (e) {
	this.mouseIsDown = true;
};

WaveController.prototype.mouseUp = function (e) {
	this.mouseIsDown = false;
};

WaveController.prototype.distanceBetween = function (p1, p2) {
	var dx = p2.x - p1.x,
		dy = p2.y - p1.y;

	return Math.sqrt(dx * dx + dy * dy);
};

WaveController.prototype.canvasResized = function () {
	console.log(1);
	for (var i = 0; i < WaveController.DETAIL + 1; i++) {
		this.particles[i].x = WIDTH / (WaveController.DETAIL - 4) * (i - 2);
		this.particles[i].y = HEIGHT * WaveController.WAVE_HEIGHT_MULTIPLIER;

		this.particles[i].original.x = this.particles[i].x;
		this.particles[i].original.y = this.particles[i].y;
	}
};