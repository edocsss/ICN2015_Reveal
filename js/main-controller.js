var slideProperties = {
    n: 6,
    curSlideId: 0,
    slideListener: false,
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
    // this.selector.hide("slide", {direction: 'down'});
    this.selector.animate({
        "margin-bottom": -75
    }, 400);
    this.visibility = false;
};

slideProperties.footer.show = function () {
    // this.selector.show('slide', {direction: 'down'});
    this.selector.animate({
        "margin-bottom": 0
    }, 400);
    this.visibility = true;
};

slideProperties.changeSlide = function (targetSlide, targetShipX) {
    if (targetSlide >= this.n || targetSlide < 0 || this.curSlideId === targetSlide) {
        this.enableScroll();
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
    if (targetSlide > this.curSlideId) {
        // Change slide
        $("div.slides").eq(this.curSlideId).hide("slide", {direction: "left"});
        $("div.slides").eq(targetSlide).show("slide", {direction: "right"}, (function () {
            this.enableScroll();
        }).bind(this));

        // $("div.slides").eq(this.curSlideId).animate({
        //     left: -window.innerWidth,
        //     opacity: 0
        // }, 500, function () {
        //     $("div.slides").eq(this.curSlideId).css("display", "none");
        // });

        // $("div.slides").eq(targetSlide).css({
        //     left: window.innerWidth,
        //     opacity: 0,
        //     display: "block"
        // }).animate({
        //     left: 0,
        //     opacity: 1
        // }, 500, (function () {
        //     this.enableScroll();
        // }).bind(this));


    } else if (targetSlide < this.curSlideId) {
        // Change slide
        $("div.slides").eq(this.curSlideId).hide("slide", {direction: "right"});
        $("div.slides").eq(targetSlide).show("slide", {direction: "left"}, (function () {
            this.enableScroll();
        }).bind(this));

    //     $("div.slides").eq(this.curSlideId).animate({
    //         left: window.innerWidth,
    //         opacity: 0
    //     }, 500, function () {
    //         $("div.slides").eq(this.curSlideId).css("display", "none");
    //     });

    //     $("div.slides").eq(targetSlide).css({
    //         left: -window.innerWidth,
    //         opacity: 0,
    //         display: "block"
    //     }).animate({
    //         left: 0,
    //         opacity: 1
    //     }, 500, (function () {
    //         this.enableScroll();
    //     }).bind(this));
    }
    
    this.curSlideId = targetSlide;
    lastPosition = targetSlide;
};

slideProperties.enableScroll = function () {
    this.slideListener = true;
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
                slideProperties.slideListener = true;

                console.log("TEST");
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

// Main controller
$(document).ready(function () {
    loadingProperties.initLoadingAnimation();

	// Hiding loading layer on document ready
    // $(".loading-layer").fadeOut('500');
    
    // // In case the slideListener stuck (don't know why)
    // setInterval(function () {
    //     slideProperties.slideListener = true;
    // }, 500);

    $(document).on("DOMMouseScroll mousewheel", function (e) {
        var nextSlide;
        if (slideProperties.slideListener) {
            slideProperties.slideListener = false;
            
            if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
                nextSlide = slideProperties.curSlideId + 1;
                slideProperties.changeSlide(nextSlide, 0);
            }
            else {
                nextSlide = slideProperties.curSlideId - 1;
                slideProperties.changeSlide(nextSlide, 0);
            }
        }
    });

    $("body").on("swipeleft", function () {
        if (slideProperties.slideListener) {
            var nextSlide = slideProperties.curSlideId + 1;
            slideProperties.slideListener = false;
            slideProperties.changeSlide(nextSlide, 0);
        }
    });

    $("body").on("swiperight", function () {
        if (slideProperties.slideListener) {
            var nextSlide = slideProperties.curSlideId - 1;
            slideProperties.slideListener = false;
            slideProperties.changeSlide(nextSlide, 0);
        }
    });

    // Keydown event handler
    $(document).keydown(function (e) {
        var nextSlide;
        e = e || window.event;

        // Left arrow
        if (e.keyCode == '37' && slideProperties.slideListener) {
            slideProperties.slideListener = false;
            nextSlide = slideProperties.curSlideId - 1;
            slideProperties.changeSlide(nextSlide, 0);
        } 
        // Right arrow
        else if (e.keyCode == '39' && slideProperties.slideListener) {
            slideProperties.slideListener = false;
            nextSlide = slideProperties.curSlideId + 1;
            slideProperties.changeSlide(nextSlide, 0);
        }
    });

    // Navbar anchor link handler (ACTIVE CLASS & CHANGING SLIDE HANDLER)
    $(".nav a, .navbar-brand").click(function (event) {
        var nextSlide = parseInt(this.getAttribute("data-slide"));

        console.log(nextSlide, "CLICK");
        if (slideProperties.slideListener) {
            slideProperties.slideListener = false;
            slideProperties.changeSlide(nextSlide, 0);
        }
    });

    /* SLICK SLIDER */
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

    // $(".sponsor-slider").slick();
});













// CONTROLS IF USING MANUAL SCROLL INSTEAD OF SCROLLING IN ONE BLOCK AT A TIME //

/*
$(document).ready(function () {
    $("body").mousewheel(function (e, delta) {
        this.scrollLeft -= (delta * 30);
        e.preventDefault();
    });
    
    // Animation purpose
    var controller = new ScrollMagic.Controller({
                        vertical: false
                     });
    var scene = new ScrollMagic.Scene({ 
                    triggerElement: "span.trigger",
                    // Initially, the window is shown $(window).width(), the space we can move is only the whole width - 1 window width
                    duration: $("#container").width() - $(window).width()
                    })
                    .setTween("#animation-item", 1, {
                            left: $(window).width() - $("#animation-item").width() - $("#animation-item").css("paddingRight").replace("px", "") -
                                  $("#animation-item").css("paddingLeft").replace("px", "")
                            })
                    .addTo(controller);
});

*/