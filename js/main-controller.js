var slideProperties = {
    n: 4,
    curSlideId: 0,
    slideListener: true,
    footer: {
        selector: $('#footer'),
        visibility: true
    }
};

slideProperties.checkActiveLink = function (targetSlide) {
    $(".nav").find(".active").removeClass('active');
    if (targetSlide === 0) {
        return;
    }

    $(".nav > li > a:eq(" + (targetSlide - 1) + ")").parent().addClass('active');
};

slideProperties.footer.hide = function () {
    this.selector.hide("slide", {direction: 'down'});
    this.visibility = false;
};

slideProperties.footer.show = function () {
    this.selector.show('slide', {direction: 'down'});
    this.visibility = true;
};

slideProperties.changeSlide = function (targetSlide) {
    if (targetSlide >= this.n || targetSlide < 0) {
        this.enableScroll();
        return;
    }

    if (targetSlide === this.n - 1 && this.footer.visibility === true) {
        this.footer.hide();
    } else if (targetSlide !== this.n - 1 && this.footer.visibility === false) {
        this.footer.show();
    }
    
    this.checkActiveLink(targetSlide);
    if (targetSlide > this.curSlideId) {
        // Change slide
        $("div.slides").eq(this.curSlideId).hide("slide", {direction: "left"});
        $("div.slides").eq(targetSlide).show("slide", {direction: "right"}, (function () {
            this.enableScroll();
        }).bind(this));
    } else if (targetSlide < this.curSlideId) {
        // Change slide
        $("div.slides").eq(this.curSlideId).hide("slide", {direction: "right"});
        $("div.slides").eq(targetSlide).show("slide", {direction: "left"}, (function () {
            this.enableScroll();
        }).bind(this));
    }
    
    slideProperties.curSlideId = targetSlide;
};

slideProperties.enableScroll = function () {
    this.slideListener = true;
};

// Main controller
$(document).ready(function () {
    // Hide the loading indicator by jQuery UI
    $("div.ui-loader").hide();

    // Hiding loading layer on document ready
    $(".loading-layer").fadeOut('500');

    $(document).on("DOMMouseScroll mousewheel", function (e) {
        if (slideProperties.slideListener) {
            slideProperties.slideListener = false;
            
            if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
                slideProperties.changeSlide(slideProperties.curSlideId + 1);
            }
            else {
                slideProperties.changeSlide(slideProperties.curSlideId - 1);
            }
        }
    });

    $("#container").on("swipeleft", function () {
        if (slideProperties.slideListener) {
            slideProperties.slideListener = false;
            slideProperties.changeSlide(slideProperties.curSlideId + 1);
        }
    });

    $("#container").on("swiperight", function () {
        if (slideProperties.slideListener) {
            slideProperties.slideListener = false;
            slideProperties.changeSlide(slideProperties.curSlideId - 1);
        }
    });

    // Keydown event handler
    $(document).keydown(function (e) {
        e = e || window.event;

        // Left arrow
        if (e.keyCode == '37' && slideProperties.slideListener) {
            slideProperties.slideListener = false;
            slideProperties.changeSlide(slideProperties.curSlideId - 1);
        } 
        // Right arrow
        else if (e.keyCode == '39' && slideProperties.slideListener) {
            slideProperties.slideListener = false;
            slideProperties.changeSlide(slideProperties.curSlideId + 1);
        }
    });

    // Navbar anchor link handler (ACTIVE CLASS & CHANGING SLIDE HANDLER)
    $(".nav a, .navbar-brand").click(function (event) {
        var nextSlide = parseInt(this.getAttribute("data-slide"));

        if (slideProperties.slideListener) {
            slideProperties.slideListener = false;
            slideProperties.changeSlide(nextSlide);
        }
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