

$(document).ready(function () {
    let evntVSId;
    var $slider = $('#home-slider');
    var $progressBar = $('.progressBar');

    $slider.slick({ speed: 1200, dots: false, rtl: isRtl, arrows: false, autoplay: false, draggable: true, adaptiveHeight: false, mobileFirst: true, pauseOnDotsHover: true });

    $slider.on('swipe', function () {
        startProgressbar();
    });

    var time = 2, isPause, tick, percentTime;
    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        isPause = false;
        tick = setInterval(interval, 30);
    }

    function interval() {
        if (isPause === false) {
            percentTime += 1 / (time + 0.1);
            $progressBar.css({
                width: percentTime + "%"
            });
            if (percentTime >= 100) {
                $slider.slick('slickNext');
                startProgressbar();
            }
        }
    }

    function resetProgressbar() {
        $progressBar.css({
            width: 0 + '%'
        });
        clearTimeout(tick);
    }

    startProgressbar();

    //typewrite

    let elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-type');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    // pills hover
    $('#most-searched-services [data-toggle="pill"]').hover(
        function () {
            if (!$(this).hasClass('active'))
                $('#most-searched-services .row.tab-pane').removeClass("show active");
            $(this).click();
        }
    );
    //event slider

    $('#events-container [data-eventbg-url]').on('click',
        function () {
            let bgUrl = $(this).attr('data-eventbg-url');
            $("div.event-bg").css("background-image", "url('" + bgUrl + "')");
        }
    );
    evntVSId = setInterval(eventsVerticalSlider, 4000);

    let pd = Math.floor($("#services-list>.container").offset().left + 20);
    if (window.location.href.indexOf("/en/") > 0) {
        $("#most-searched-services .nav-pills-green li a").css("padding-left", pd + 'px');
        $("#events-container .first").css("padding-left", pd + 'px');
    }
    else {
        $("#most-searched-services .nav-pills-green li a").css("padding-right", pd + 'px');
        $("#events-container .first").css("padding-right", pd + 'px');
    }
    $('#events-container [data-event-cat]').on("click",
        function () {
            if (!$(this).hasClass('active')) {
                $('#events-container .md-pills .nav-link.active').removeClass('active');
                $('#events-container .md-pills.pills-events').removeClass('pills-events');
                clearInterval(evntVSId);
                let _containerId = $(this).attr('data-event-cat');
                setTimeout(function () {
                    $("div#" + _containerId).find('.md-pills').addClass('pills-events');
                    $("div#" + _containerId).find(".nav li:first a").click();
                    evntVSId = setInterval(eventsVerticalSlider, 4000);
                }, 10);
            }
        }
    );
});

function headerSearchFocus(e) {
    let $this = e.currentTarget;
    $($this).parents().find('label').addClass('hide');
    $this.classList.add('active');
}
function headerSearchFocusOut(e) {
    let $this = e.currentTarget;
    if ($this.value.length < 1) {
        $($this).parents().find('label').removeClass('hide');
        $this.classList.remove('active');
        $("#search-container-results").hide();
    }
    return;
}


let searchKeys = ['health', 'law', 'justice', 'ministry'];
function homeHeaderSearch(e) {
    let $this = e.currentTarget;
    if ($this.value.length > 2) {
        $("#search-container-results").show();
        //testing purpose only
        // if (searchKeys.reduce((a, c) => a + c).indexOf($this.value) >= 0) {
        //     $("#search-container-results .results").show();
        //     $("#search-container-results .no-results").hide();
        //     setTimeout(function () {
        //         $("html, body").animate({ scrollTop: 200 });
        //         $('.scrollbar-inner').scrollbar({
        //             // 'disableBodyScroll': true 
        //         });
        //     }, 10);
        // }
        // else {
        //     $("#search-container-results .results").hide();
        //     $("#search-container-results .no-results").show();
        // }
    }
    if ($this.value.length < 1) {
        $("#search-container-results").hide();
        $("#search-container-results .results").hide();
        $("#search-container-results .no-results").hide();
    }
}

function eventsVerticalSlider() {

    let onLastLi = $(".pills-events>li:last a").hasClass("active");
    let currentLi = $(".pills-events>li a.active");
    currentLi.removeClass("active");

    if (onLastLi) {
        $(".pills-events>li:first a").click();
    } else {
        currentLi.parent().next().find('a').click();
    }

};


function homeHitSearchContainer(e) {
    if (e.currentTarget.value.length > 0) {
        let headerSearchQuery = e.currentTarget.value;
        $('#home-hero-search').focus();
        $('#home-hero-search').val(headerSearchQuery);
        hideSearch();
    }
}