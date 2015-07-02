$(window).load(function () {
	$(".logo").waitForImages(function () {
        $(".loading-layer").animate({
            opacity: 0
        }, 400, function () {
            $(".loading-layer").css("display", "none");
        });
    });

	var container = $(".main-container-small > .container-fluid"),
		containerHeight = container.height();
    if (containerHeight < window.innerHeight) {
    	container.css("margin-top", (window.innerHeight - containerHeight) / 2);
    }
});