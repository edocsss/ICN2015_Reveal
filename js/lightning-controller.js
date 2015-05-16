function LightningController () {
	var canvas = $('#canvas');

	var CANVAS_WIDTH = canvas.width();
	var CANVAS_HEIGHT = canvas.height();
	var NO_OF_LIGHTNINGS = 2;
	var lightnings = [];

	var BASE_INTERVAL = 2000;
	var FADE_OUT_INTERVAL = 500;
}

LightningController.prototype.init = function () {
	for (var i = 1; i <= this.NO_OF_LIGHTNINGS; i++) {
		var imageUrl = '../img/Lightning ' + i + '.png';
			image = new Image(imageUrl);
			
		this.lightnings.push(image);
	}
};