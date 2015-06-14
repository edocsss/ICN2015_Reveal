/* --------------------------------------------------------------------------------------------------------------------- */

var slideProperties = {
    n: 6,
    curSlideId: 0,
    scrollListener: false,
    footer: {
        selector: $('#footer'),
        visibility: true
    }
};

slideProperties.checkActiveLink = function (targetSlide) {
    // var targetBullet = this.activeBulletMapping[targetSlide];
    // console.log(targetBullet, targetSlide);

    $(".nav").find(".active").removeClass('active');
    if (targetSlide === 0 /* || targetBullet === -1 */) {
        return;
    }

    // $(".nav > li > a:eq(" + targetBullet + ")").parent().addClass('active');
    $(".nav > li > a:eq(" + (targetSlide - 1) + ")").parent().addClass('active');
};

slideProperties.footer.hide = function () {
    this.selector.animate({
        "margin-bottom": -75
    }, 400);
    this.visibility = false;
};

slideProperties.footer.show = function () {
    this.selector.animate({
        "margin-bottom": 0
    }, 400);
    this.visibility = true;
};

slideProperties.changeSlide = function (targetSlide) {
    if (targetSlide >= this.n || targetSlide < 0 || this.curSlideId === targetSlide) {
        // this.enableScroll();
        return;
    }

    // Handle Canvas shown only in the last slide
    if (targetSlide === this.n - 1) {
        shipController.targetX = 0.4 * WIDTH;
        $(".canvas-container").animate({
            opacity: 1
        }, 1500);
    } else {
        shipController.targetX = 0;
        $(".canvas-container").stop().animate({
            opacity: 0
        }, 700);
    }

    if (targetSlide >= this.n - 2 && this.footer.visibility === true) {
        this.footer.hide();
    } else if (targetSlide < this.n - 2 && this.footer.visibility === false) {
        this.footer.show();
    }
    
    this.checkActiveLink(targetSlide);
    Reveal.slide(targetSlide, 0, 0);
    
    this.curSlideId = targetSlide;
    // lastPosition = targetSlide;
};

slideProperties.enableScroll = function () {
    this.scrollListener = true;
};

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
                slideProperties.scrollListener = true;

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

/* ******************************************************************************************* */

$(document).ready(function () {
    // Reveal
    Reveal.initialize({
        controls: false,
        progress: false,
        center: false,
        keyboard: false,
        width: window.innerwidth,
        height: window.innerwidth,
    });

    // Slick
    $(".sponsor-slider").slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        variableWidth: true,
        speed: 300,
        infinite: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        swipeToSlide: true
    });

    // On navbar link clicked
    $(".nav a, .navbar-brand").click(function (event) {
        var nextSlide = parseInt(this.getAttribute("data-slide"));
        slideProperties.changeSlide(nextSlide);

        // if (slideProperties.scrollListener) {
        //      slideProperties.scrollListener = false;
        //      slideProperties.changeSlide(nextSlide);
        // }
    });

    // On keyboard control
    $(document).keydown(function (e) {
        var nextSlide;
        e = e || window.event;

        // Left arrow
        if (e.keyCode == '37') {
            // slideProperties.slideListener = false;
            nextSlide = slideProperties.curSlideId - 1;
            slideProperties.changeSlide(nextSlide, 0);
        } 
        // Right arrow
        else if (e.keyCode == '39') {
            // slideProperties.slideListener = false;
            nextSlide = slideProperties.curSlideId + 1;
            slideProperties.changeSlide(nextSlide, 0);
        }
    });

    // On mouse scroll control
    $(document).on("DOMMouseScroll mousewheel", function (e) {
        var nextSlide;
        if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
            nextSlide = slideProperties.curSlideId + 1;
            slideProperties.changeSlide(nextSlide, 0);
        } else {
            nextSlide = slideProperties.curSlideId - 1;
            slideProperties.changeSlide(nextSlide, 0);
        }
    });
});