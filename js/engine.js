/*// CONSTANTS & Globals
var NUM_OF_SLIDES = 4;

// Keep track which slide to be shown
var curSlideId = 0;

// Prevent multiple page scrolling
var scrollListener = true;

// Keep track how far the cursor has moved
var cursorInitPos;*/

var slideProperties = {
    n: 4,
    curSlideId: 0,
    scrollListener: true
};

slideProperties.checkActiveLink = function (targetSlide) {
    $(".nav").find(".active").removeClass('active');
    if (targetSlide === 0) {
        return;
    }

    $(this).parent().addClass('active');
};

slideProperties.changeSlide = function (targetSlide) {
    if (targetSlide >= this.n || targetSlide < 0) {
        this.enableScroll();
        return;
    }
    
    if (targetSlide > this.curSlideId) {
        $("div.slides").eq(this.curSlideId).hide("slide", {direction: "left"});
        $("div.slides").eq(targetSlide).show("slide", {direction: "right"}, this.enableScroll.bind(this));
    } else if (targetSlide < slideProperties.curSlideId) {
        $("div.slides").eq(this.curSlideId).hide("slide", {direction: "right"});
        $("div.slides").eq(targetSlide).show("slide", {direction: "left"}, this.enableScroll.bind(this));
    }
    
    slideProperties.curSlideId = targetSlide;
};

slideProperties.enableScroll = function () {
    setTimeout((function () {
        this.scrollListener = true;
    }).bind(this), 200);
};

// Main controller
$(document).ready(function () {
    // Hide the loading indicator by jQuery UI
    $("div.ui-loader").hide();

    // Hide all slides other than the first slide
    $("div.slides:not(:first)").hide();

    $(document).on("DOMMouseScroll mousewheel", function (e) {
        if (slideProperties.scrollListener) {
            slideProperties.scrollListener = false;
            
            if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) slideProperties.changeSlide(slideProperties.curSlideId + 1);
            else slideProperties.changeSlide(slideProperties.curSlideId - 1);
        }
    });

    $("#container").on("swipeleft", function () {
        slideProperties.changeSlide(slideProperties.curSlideId + 1);
    });

    $("#container").on("swiperight", function () {
        slideProperties.changeSlide(slideProperties.curSlideId - 1);
    });

    // Keydown event handler
    $(document).keydown(function (e) {
        e = e || window.event;

        // Left arrow
        if (e.keyCode == '37') {
            slideProperties.changeSlide(slideProperties.curSlideId - 1);
        } 
        // Right arrow
        else if (e.keyCode == '39') {
            slideProperties.changeSlide(slideProperties.curSlideId + 1);
        }
    });

    // Navbar anchor link handler (ACTIVE CLASS & CHANGING SLIDE HANDLER)
    $(".nav a, .navbar-brand").click(function (event) {
        var nextSlide = parseInt(this.getAttribute("data-slide"));
        slideProperties.changeSlide(nextSlide);
        slideProperties.checkActiveLink.call(this, nextSlide);
    });
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