LightningController.NO_OF_LIGHTNINGS = 12;
LightningController.BASE_INTERVAL = 2000;
LightningController.FADE_OUT_INTERVAL = 500;
LightningController.BASE_LIGHTNING_POSITION = [0.333333 * WIDTH, 0.666667 * WIDTH];

function LightningController () {
	this.lightnings = [];
	this.lastIndex = [];
}

LightningController.prototype.initialize = function () {
	for (var i = 1; i <= LightningController.NO_OF_LIGHTNINGS; i++) {
		var imageUrl = 'img/lightnings/' + i + '.png',
			img = new Image();

		img.src = imageUrl;		
		this.lightnings.push({
			image: img,
			opacity: 0,
			x: 0,
			y: $(".navbar").height()
		});

		this.lastIndex.push(0);
	}

	// Need a more random timing
	// Add more setInterval to add more lightning to the canvas
	var chooseLightning1 = setInterval((function () {
			this.selectLightning(LightningController.BASE_LIGHTNING_POSITION[0] + Math.sin(2 * Math.PI * Math.random()) * 0.15 * WIDTH );
		}).bind(this), 2000),
		
		chooseLightning2 = setInterval((function () {
			this.selectLightning(LightningController.BASE_LIGHTNING_POSITION[1] + Math.cos(2 * Math.PI * Math.random()) * 0.15 * WIDTH);
		}).bind(this), 2500);
};

LightningController.prototype.selectLightning = function (positionX) {
	var index = Math.abs(Math.round(Math.random() * 5 * Math.sin(2 * Math.PI * Math.random()) * (LightningController.NO_OF_LIGHTNINGS - 1) / LightningController.NO_OF_LIGHTNINGS));

	// Prevent using the same lightning twice
	// while (this.lightnings[index].opacity > 0) {
	// 	index = Math.round(Math.random() * (LightningController.NO_OF_LIGHTNINGS - 1));
	// 	console.log(index);
	// }

	if (this.lightnings[index].opacity > 0) {
		return;
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
			lightning.opacity -= 0.04 + 0.02 * Math.sin(2 * Math.PI * Math.random());

			// Draw the lighning
			context.drawImage(lightning.image, lightning.x, lightning.y, 160, 320);

			// Restore settings
			context.restore();
		} else {
			lightning.opacity = 0;
		}
	}
};