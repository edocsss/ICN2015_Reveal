/* ***************************************************************************** */

var loadingProperties = {
    loadingLayer: $(".loading-layer"),
    loadingLogo: $(".loading-logo"),
    backgroundLoader: $("#background-loader"),
    init: false,
    initLoadingAnimation: function () {
        $("body").css("opacity", "1").css("background-image", 'url("img/background.svg")');
        this.loadingLogo.animate({
            opacity: 1
        }, 4000, function () {
            setTimeout(function () {
                $(".main-container").css("opacity", "1");
                loadingProperties.loadingLayer.animate({
                    opacity: 0
                }, 2000, function () {
                    loadingProperties.loadingLayer.css("display", "none");
                    loadingProperties.loadingLogo.css("display", "none");
                });
            }, 1000);
        });
    }
};

loadingProperties.loadingLayer.css("background-image", 'url("img/background.svg")').waitForImages(function () {
    if (loadingProperties.init) {
        loadingProperties.initLoadingAnimation();
    } else {
        loadingProperties.init = true;
    }
}, $.noop, true);

loadingProperties.loadingLogo.waitForImages(function () {
    if (loadingProperties.init) {
        loadingProperties.initLoadingAnimation();
    } else {
        loadingProperties.init = true;
    }
}, $.noop, true);

/* --------------------------------------------------------------------------------------------------------------------- */

$(document).ready(function () {
    Reveal.initialize({
        controls: false,
        progress: false,
        center: false,
        width: window.innerwidth,
        height: window.innerwidth
    });
});