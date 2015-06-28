var video = document.getElementById("welcome-video"),
    slideProperties = {
        n: 7,
        curSlideId: 0,
        scrollListener: true,
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

    if (targetSlide === 0 && !video.ended) {
        video.play();
    }

    if (targetSlide >= this.n - 3 && this.footer.visibility === true) {
        this.footer.hide();
    } else if (targetSlide < this.n - 3 && this.footer.visibility === false) {
        this.footer.show();
    }
    
    // this.checkActiveLink(targetSlide);
    Reveal.slide(targetSlide, 0, 0);
    
    this.curSlideId = targetSlide;
    // lastPosition = targetSlide;
};

slideProperties.enableScroll = function () {
    this.scrollListener = true;
};

/* ***************************************************************************** */

// var loadingProperties = {
//     loadingLayer: $(".loading-layer"),
//     loadingLogo: $(".loading-logo"),
//     backgroundLoader: $("#background-loader"),
//     init: false,
//     initLoadingAnimation: function () {
//         $("body").css("opacity", "1").css("background-image", 'url("img/background.svg")');
//         this.loadingLogo.animate({
//             opacity: 1
//         }, 4000, function () {
//             setTimeout(function () {
//                 $(".main-container").css("opacity", "1");
//                 document.getElementById("welcome-video").play();
//                 slideProperties.scrollListener = true;

//                 // player.playVideo();

//                 loadingProperties.loadingLayer.animate({
//                     opacity: 0
//                 }, 2000, function () {
//                     loadingProperties.loadingLayer.css("display", "none");
//                     loadingProperties.loadingLogo.css("display", "none");
//                 });
//             }, 1000);
//         });
//     }
// };

// loadingProperties.loadingLayer.css("background-image", 'url("img/background.svg")').waitForImages(function () {
//     if (loadingProperties.init) {
//         loadingProperties.initLoadingAnimation();
//     } else {
//         loadingProperties.init = true;
//     }
// }, $.noop, true);

// loadingProperties.loadingLogo.waitForImages(function () {
//     if (loadingProperties.init) {
//         loadingProperties.initLoadingAnimation();
//     } else {
//         loadingProperties.init = true;
//     }
// }, $.noop, true);

/* ******************************************************************************************* */

var timeline = {
    selector: $(".timeline"),
    height: 200,
    diameter: 16.5,
    lineLength: 20,
    left: $(".timeline").css("left")
};

timeline.initialize = function () {
    if (window.innerHeight > 700) {
            this.height = 250;
            this.diameter = 22;
            this.lineLength = 24;
        } else {
            this.height = 200;
            this.diameter = 16.5;
            this.lineLength = 20;
        }

        this.top = (window.innerHeight / 2) - (this.height / 2) - 20;
        this.middlePoint = this.top + this.height / 2 - 20;

        $(".timeline").css("top", this.top);
        $("#about-icn").css("top", this.top);
        $("#icn2014").css("top", this.top + 1 * this.diameter + 1 * this.lineLength);
        $("#icn2013").css("top", this.top + 2 * this.diameter + 2 * this.lineLength);
        $("#icn2011").css("top", this.top + 3 * this.diameter + 3 * this.lineLength);
        $("#icn2010").css("top", this.top + 4 * this.diameter + 4 * this.lineLength);
        $("#icn2008").css("top", this.top + 5 * this.diameter + 5 * this.lineLength);

        $("#about-icn").css({
            "width": this.diameter,
            "height": this.diameter,
            "top": this.top
        });

        $("#icn2014").css({
            "width": this.diameter,
            "height": this.diameter,
            "top": this.top + 1 * this.diameter + 1 * this.lineLength
        });

        $("#icn2013").css({
            "width": this.diameter,
            "height": this.diameter,
            "top": this.top + 2 * this.diameter + 2 * this.lineLength
        });

        $("#icn2011").css({
            "width": this.diameter,
            "height": this.diameter,
            "top": this.top + 3 * this.diameter + 3 * this.lineLength
        });

        $("#icn2010").css({
            "width": this.diameter,
            "height": this.diameter,
            "top": this.top + 4 * this.diameter + 4 * this.lineLength
        });

        $("#icn2008").css({
            "width": this.diameter,
            "height": this.diameter,
            "top": this.top + 5 * this.diameter + 5 * this.lineLength
        });

    // Clicking area click event
    $("#about-icn").click(function () {
        Reveal.slide(3, 0, 0);
    });

    $("#icn2014").click(function () {
        Reveal.slide(3, 1, 0);
    });

    $("#icn2013").click(function () {
        Reveal.slide(3, 2, 0);
    });

    $("#icn2011").click(function () {
        Reveal.slide(3, 3, 0);
    });

    $("#icn2010").click(function () {
        Reveal.slide(3, 4, 0);
    });

    $("#icn2008").click(function () {
        Reveal.slide(3, 5, 0);
    });

    // Repositioning on resize
    $(window).resize((function () {
        if (window.innerHeight > 700) {
            this.height = 250;
            this.diameter = 22;
            this.lineLength = 24;
        } else {
            this.height = 200;
            this.diameter = 16.5;
            this.lineLength = 20;
        }

        this.top = (window.innerHeight / 2) - (this.height / 2) - 20;
        this.middlePoint = this.top + this.height / 2 - 20;

        $(".timeline").css("top", this.top);
        $("#about-icn").css("top", this.top);
        $("#icn2014").css("top", this.top + 1 * this.diameter + 1 * this.lineLength);
        $("#icn2013").css("top", this.top + 2 * this.diameter + 2 * this.lineLength);
        $("#icn2011").css("top", this.top + 3 * this.diameter + 3 * this.lineLength);
        $("#icn2010").css("top", this.top + 4 * this.diameter + 4 * this.lineLength);
        $("#icn2008").css("top", this.top + 5 * this.diameter + 5 * this.lineLength);

        $("#about-icn").css({
                "width": this.diameter,
                "height": this.diameter,
                "top": this.top
            });

        $("#icn2014").css({
            "width": this.diameter,
            "height": this.diameter,
            "top": this.top + 1 * this.diameter + 1 * this.lineLength
        });

        $("#icn2013").css({
            "width": this.diameter,
            "height": this.diameter,
            "top": this.top + 2 * this.diameter + 2 * this.lineLength
        });

        $("#icn2011").css({
            "width": this.diameter,
            "height": this.diameter,
            "top": this.top + 3 * this.diameter + 3 * this.lineLength
        });

        $("#icn2010").css({
            "width": this.diameter,
            "height": this.diameter,
            "top": this.top + 4 * this.diameter + 4 * this.lineLength
        });

        $("#icn2008").css({
            "width": this.diameter,
            "height": this.diameter,
            "top": this.top + 5 * this.diameter + 5 * this.lineLength
        });
    }).bind(this));
};

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
        swipeToSlide: true,
        backgroundTransition: 'none',
        viewDistance: 7
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
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });

    $(".sponsor-page-slider").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: true,
        speed: 300,
        infinite: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
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
        if (!slideProperties.scrollListener) {
            return;
        }

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
        if (!slideProperties.scrollListener) {
            return;
        }

        var nextSlide;
        if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
            nextSlide = slideProperties.curSlideId + 1;
            slideProperties.changeSlide(nextSlide, 0);
        } else {
            nextSlide = slideProperties.curSlideId - 1;
            slideProperties.changeSlide(nextSlide, 0);
        }
    });

    // Check active link
    Reveal.addEventListener("slidechanged", function (event) {
        if (!slideProperties.scrollListener) {
            return;
        }

        var activeLinkIndex = parseInt(event.currentSlide.getAttribute("data-active-link"));
        slideProperties.checkActiveLink(activeLinkIndex);
    });

    // Show modal on cast image click
    $(".cast-image").click(function () {
        slideProperties.scrollListener = false;
        var castName = this.getAttribute("data-name");
        $("#cast-" + castName).modal();

        $("#cast-" + castName).on("hidden.bs.modal", function () {
            slideProperties.scrollListener = true;
        });
    });

    // Timeline
    timeline.initialize();

    // Video
    setTimeout(function () {
        $(".loading-layer").animate({
            opacity: 0
        }, 400, function () {
            $(".loading-layer").css("display", "none");
        });

        video.play();
    }, 1000);
});

// Youtube API usage
// var player;
// function onYouTubeIframeAPIReady () {
//     player = new YT.Player('player', {
//         height: window.innerHeight,
//         width: window.innerWidth,
//         videoId: "gCg5aUnxNBg",
//         events: {
//             'onReady': onPlayerReady
//         }
//     });
// }

// function onPlayerReady (e) {
//     // e.target.playVideo();
// }