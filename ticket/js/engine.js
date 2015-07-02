$(document).ready(function () {
	setTimeout(function () {
        $(".loading-layer").animate({
            opacity: 0
        }, 400, function () {
            $(".loading-layer").css("display", "none");
            shipController.targetX = 0.2 * WIDTH;
        });
    }, 1000);
});