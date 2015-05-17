LightningController.NO_OF_LIGHTNINGS = 2;
LightningController.BASE_INTERVAL = 2000;
LightningController.FADE_OUT_INTERVAL = 500;
LightningController.BASE_LIGHTNING_POSITION = [0.25 * WIDTH, 0.5 * WIDTH, 0.75 * WIDTH];

function LightningController () {
	this.lightnings = [];
}

LightningController.prototype.initialize = function () {
	for (var i = 1; i <= LightningController.NO_OF_LIGHTNINGS; i++) {
		var imageUrl = 'img/Lightning ' + i + '.png';
			img = new Image(imageUrl);
		
		img.src = imageUrl;
		this.lightnings.push({
			image: img,
			opacity: 0,
			x: 0,
			y: 0
		});
	}

	var chooseLightning1 = setInterval(this.selectLightning.bind(this), LightningController.BASE_INTERVAL),
		chooseLightning2 = setInterval(this.selectLightning.bind(this), LightningController.BASE_INTERVAL);
};

LightningController.prototype.selectLightning = function () {
	var index = Math.round(Math.random() * (LightningController.NO_OF_LIGHTNINGS - 1)),
		positionX = LightningController.BASE_LIGHTNING_POSITION[Math.round(Math.random() * LightningController.BASE_LIGHTNING_POSITION.length)] + 
					300 * Math.sin(2 * Math.PI * Math.random());

	this.lightnings[index].opacity = 1;
};

// LightningController.prototype.drawLightning = function () {
// 	var	opacity;

// 	for (var i = 0; i < LightningController.NO_OF_LIGHTNINGS; i++) {
// 		// positionX : Harus di save di lightnings nya -> kalo opacity > 0 = jangan diubah (krn harus ditempat sebelumnya lagi)
// 		opacity = this.lightnings[i].opacity;
// 		if (this.lightnings[i].opacity > 0) {
// 			context.save();

// 			context.globalAlpha = opacity;
// 			this.lightnings[i].opacity -= 0.1;

// 			context.drawImage(this.lightnings[i].image, positionX, 0);

// 			context.restore();
// 		} else {
// 			this.lightnings[i].opacity = 0;
// 		}

// 	}
// };