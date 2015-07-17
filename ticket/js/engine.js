$(document).ready(function () {
	setTimeout(function () {
        $(".loading-layer").animate({
            opacity: 0
        }, 400, function () {
            $(".loading-layer").css("display", "none");
        });
    }, 1000);

	// var priceBox = {
	// 	top: $(".price-box").css("top"),
	// 	curY: $(window).scrollTop()
	// };

	$(".price-box").css("top", (window.innerHeight - $(".price-box").height()) / 2);
	// $(window).scroll(function () {
	// 	var distance = $(window).scrollTop() - priceBox.curY;

	// 	$(".price-box").stop();
	// 	$(".price-box").animate({
	// 		"top": priceBox.top + distance
	// 	}, 10);

	// 	priceBox.top = distance;
	// });
});