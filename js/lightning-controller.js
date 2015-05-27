LightningController.NO_OF_LIGHTNINGS = 20;
LightningController.BASE_INTERVAL = 2000;
LightningController.FADE_OUT_INTERVAL = 500;
LightningController.BASE_LIGHTNING_POSITION = [0.25 * WIDTH, 0.666667 * WIDTH];

function LightningController (flash) {
	this.lightnings = [];
	this.lastIndex = [];
	this.flash = flash;
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
	}

	// Need a r random timing
	// Add more setInterval to add more lightning to the canvas
	var chooseLightning1 = setInterval((function () {
			this.selectLightning(LightningController.BASE_LIGHTNING_POSITION[0] + (-r.random() * 0.2 * WIDTH + 0.1 * WIDTH));
				// Math.sin(2 * Math.PI * r.random()) * 0.1 * WIDTH);
		}).bind(this), 6765 + 2000 * Math.cos(2 * Math.PI * r.random()));

	var	chooseLightning2 = setInterval((function () {
			this.selectLightning(LightningController.BASE_LIGHTNING_POSITION[1] + (-r.random() * 0.2 * WIDTH + 0.1 * WIDTH));
				// Math.cos(2 * Math.PI * r.random()) * 0.1 * WIDTH);
		}).bind(this), 5487 + 2000 * Math.sin(2 * Math.PI * r.random()));

	var resetLastIndex = setInterval((function () {
			this.lastIndex = [];
			console.log("RESET LAST INDEX");
		}).bind(this), 5000);
};

LightningController.prototype.selectLightning = function (positionX) {
	var index = Math.floor(r.random() * LightningController.NO_OF_LIGHTNINGS);
	// var index = Math.abs(Math.round(r.random() * 5 * Math.sin(2 * Math.PI * r.random()) * (LightningController.NO_OF_LIGHTNINGS - 1) / LightningController.NO_OF_LIGHTNINGS))

	if (this.lastIndex.indexOf(index) >= 0 || this.lightnings[index].opacity > 0) {
		return;
	}

	// Make that particular lightning "visible"
	this.lightnings[index].opacity = 1;

	// Set up where the lightning should be drawn horizontally
	this.lightnings[index].x = positionX;

	// Prevent this index from being chosen for the next 5s
	this.lastIndex.push(index);

	// Set flash
	if (!this.flash.justFlash) {
		this.flash.opacity = 0.5;
	}
};

LightningController.prototype.drawLightning = function () {
	var lightning;

	for (var i = 0; i < LightningController.NO_OF_LIGHTNINGS; i++) {
		// positionX : Harus di save di lightnings nya -> kalo opacity > 0 = jangan diubah (krn harus ditempat sebelumnya lagi)
		lightning = this.lightnings[i];

/*		// Tell flash to "flash" when there is an incoming lightning
		if (lightning.opacity >= 1 && !this.flash.justFlash) {
			// Update flash layer opacity if and only if there is a lightning
			this.flash.opacity = 0.8;
			this.flash.justFlash = true;
		}*/

		// Only draw "visible" lightning
		if (lightning.opacity > 0) {
			// Save settings
			context.save();

			// Set opacity & update lightning opacity
			context.globalAlpha = lightning.opacity;
			lightning.opacity -= 0.04 + 0.02 * Math.sin(2 * Math.PI * r.random());

			// Draw the lighning
			context.save();
			context.shadowColor = "#0AF6F6";
			context.shadowBlur = 10;
			context.drawImage(lightning.image, lightning.x, lightning.y, 160, 320);
			context.restore();

			// Restore settings
			context.restore();
		} else {
			lightning.opacity = 0;
		}
	}
};