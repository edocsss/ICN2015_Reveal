function Flash () {
	this.opacity = 0;
	this.justFlash = false;
}

Flash.prototype.drawFlash = function () {
	// Draw flash
	if (this.opacity > 0) {
		context.globalAlpha = this.opacity;
		context.fillStyle = "#FFFFFF";
		context.fillRect(0, 0, WIDTH, HEIGHT);

		// Update information
		this.opacity -= 0.2;
		this.justFlash = false;
	}
};