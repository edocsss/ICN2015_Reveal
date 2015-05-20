LightningController.NO_OF_LIGHTNINGS = 20;
LightningController.BASE_INTERVAL = 2000;
LightningController.FADE_OUT_INTERVAL = 500;
LightningController.BASE_LIGHTNING_POSITION = [0.25 * WIDTH, 0.5 * WIDTH, 0.75 * WIDTH];

function LightningController () {
	this.lightnings = [];
	this.lastIndex = [];
}

LightningController.prototype.initialize = function () {
	for (var i = 1; i <= LightningController.NO_OF_LIGHTNINGS; i++) {
		var imageUrl = 'img/Lightning 1.png',
			img = new Image(imageUrl);
		
		img.src = imageUrl;
		this.lightnings.push({
			image: img,
			opacity: 0,
			x: 0,
			y: 0
		});

		this.lastIndex.push(0);
	}

	// Need a more random timing
	// Add more setInterval to add more lightning to the canvas
	var chooseLightning1 = setInterval(this.selectLightning.bind(this), 2000),
		chooseLightning2 = setInterval(this.selectLightning.bind(this), 2200);
};

LightningController.prototype.selectLightning = function () {
	var index = Math.round(chance.random() * (LightningController.NO_OF_LIGHTNINGS - 1)),
		positionX = LightningController.BASE_LIGHTNING_POSITION[Math.round(chance.random() * LightningController.BASE_LIGHTNING_POSITION.length)] + 
					100 * Math.sin(2 * Math.PI * chance.random());

	// Prevent using the same lightning twice
	while (this.lightnings[index].opacity > 0) {
		index = Math.round(chance.random() * (LightningController.NO_OF_LIGHTNINGS - 1));
	}

	/*
	// Although unlikely to happen because of the BASE_INTERVAL,
	// If there is a lightning which is still visible, do not select any lightning
	for (var i = 0; i < LightningController.NO_OF_LIGHTNINGS; i++) {
		lightning = this.lightnings[i];

		if (lightning.opacity > 0) return;
	}

	*/

	// Make that particular lightning "visible"
	this.lightnings[index].opacity = 1;

	// Set up where the lightning should be drawn horizontally
	this.lightnings[index].x = positionX;
};

LightningController.prototype.drawLightning = function () {
	var lightning;

	for (var i = 0; i < LightningController.NO_OF_LIGHTNINGS; i++) {
		// positionX : Harus di save di lightnings nya -> kalo opacity > 0 = jangan diubah (krn harus ditempat sebelumnya lagi)
		lightning = this.lightnings[i];

		// Only draw "visible" lightning
		if (lightning.opacity > 0) {
			// Save settings
			context.save();

			// Set opacity & update lightning opacity
			context.globalAlpha = lightning.opacity;
			lightning.opacity -= 0.04 + 0.02 * Math.sin(2 * Math.PI * chance.random());

			// Draw the lighning
			context.drawImage(lightning.image, lightning.x, lightning.y);

			// Restore settings
			context.restore();
		} else {
			lightning.opacity = 0;
		}
	}
};