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












/*
// CONSTANTS & Globals
var NUM_OF_SLIDES = 4;

// Keep track which slide to be shown
var curSlideId = 0;

// Prevent multiple page scrolling
var scrollListener = true;

// Keep track how far the cursor has moved
var cursorInitPos;

// Main controller
$(document).ready(function () {
    // Hide all slides other than the first slide
    $("div.slides:not(:first)").hide();
    
    // Detect mouse scrolling
    var isNextSlide = true;
    $(document).on("DOMMouseScroll mousewheel", function (e) {
        if (scrollListener) {
            scrollListener = false;
            
            if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) isNextSlide = true;
            else isNextSlide = false;
        
            changeSlide(isNextSlide);
        }
    });
    
    $(document).mousedown(function (e) {
        cursorInitPos = e.pageX;
        console.log("Initial position: " + cursorInitPos);
        e.preventDefault(); // Prevent changing the cursor type
    });
    
    $(document).mouseup(function (e) {
        console.log("End position: " + e.pageX);
        var movement = e.pageX - cursorInitPos;
        
        if (movement === 0) return;
        else if (movement < 0) isNextSlide = true;
        else isNextSlide = false;
        
        changeSlide(isNextSlide);
    });
});

function changeSlide (isNextSlide) {
    if (isNextSlide) {
        if (curSlideId == NUM_OF_SLIDES - 1) {
            enableScroll();
            return;
        }
        
        $("div.slides").eq(curSlideId).hide("slide", {direction: "left"});
        $("div.slides").eq(++curSlideId).show("slide", {direction: "right"}, enableScroll);
    } else {
        if (curSlideId == 0) {
            enableScroll();
            return;
        }
        
        $("div.slides").eq(curSlideId).hide("slide", {direction: "right"});
        $("div.slides").eq(--curSlideId).show("slide", {direction: "left"}, enableScroll);
    }
}

function enableScroll () {
    setTimeout(function () {
        scrollListener = true;
    }, 200);
}
*/