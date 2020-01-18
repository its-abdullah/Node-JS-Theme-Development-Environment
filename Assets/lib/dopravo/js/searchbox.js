function mainPageSearch(lang) {
    var Keyword = $("#home-hero-search").val();

    var URL_PREFIX = "/solr/services_" + lang + "/select?q=";
    var URL_SUFFIX = "&wt=json&rows=200";
    if ($("#home-hero-search").val().length != 0) {
        var URL = URL_PREFIX + '(service_name:"' + Keyword + '*")OR(service_keywords:' + Keyword + '*)OR(description:' + Keyword + '*)' + URL_SUFFIX;
        console.info(URL);
        $
            .ajax({
                url: URL,
                success: function (data) {
                    var docs = JSON.stringify(data.response.docs);
                    var jsonData = JSON.parse(docs);
                    console.info(jsonData.length);

                    if (jsonData.length > 0) {

                        var inner_res = "";


                        inner_res += "<div class=''>";
                        inner_res += "<div id='scr' class='scrollbar-inner' style='overflow-y: auto;'>";

                        for (var i = 0; i < jsonData.length; i++) {
                            inner_res += "<div class='row mb-4'>";
                            //inner_res += "<div class='col-lg-2 col-sm-2 col-md-2 col-xl-1 align-self-center'>";
                            //inner_res += "<img class='mt-1' src='"
                            //                                + jsonData[i].service_provide_image
                            //                                + "' alt=''"
                            //                                + jsonData[i].service_name
                            //                                + "' width='47'>";



                            //inner_res += "</div>";

                            inner_res += "<div class='col-md-12'>";
                            inner_res += "<a href='/wps/portal/snp/servicesDirectory/servicedetails/" + jsonData[i].id + "'>";
                            inner_res += "<p class='font-weight-bold text-black mb-0'><strong>"
                                + jsonData[i].service_name
                                + "</strong></p>";
                            inner_res += "<p class='text-black mb-0'>"
                                + jsonData[i].service_provider
                                + "</p>";
                            inner_res += "</a>";
                            inner_res += "</div>";
                            inner_res += "</div>";

                            console.info(jsonData[i].service_name);
                        }
                        inner_res += "</div>";
                        inner_res += "</div>";
                        $("#search-container-results").css("display",
                            "block");
                        $("#no-results").css("display", "none");
                        $("#results").css("display", "block");
                        $("#results").html(inner_res);
                        //response($.map(jsonData, function(value, key) {
                        //                return {label : value.name + " <br>--- Author is " + value.author}
                        //}));

                    } else {
                        $("#search-container-results").css("display", "none");
                    }
                },
                dataType: 'jsonp',
                jsonp: 'json.wrf'
            });
    } else {
        $("#search-container-results").css("display", "none");
        //$("#search-container-results").html.("<h2>No Result</h2>)";
    }
}


$(document).ready(function () {
    //to autoscroll when textbox is focus
    $('#home-hero-search').focus(function () {
        var searchBoxPosition = Math.floor($(this).offset().top - 10);
        if ($(window).width() <= 575 && Math.floor($(window).scrollTop()) != searchBoxPosition) {
            $('html, body').animate({
                scrollTop: searchBoxPosition
            }, 400);
        }
    });

    //prevent accidental scrolling on phones
    // $('#scr').on('touchstart', function (e) {
    //     $('body').addClass('noScrolling');
    // });
    // $('#scr').on('touchend', function (e) {
    //     $('body').removeClass('noScrolling');
    // });

    //change icon
    $('#home-hero-search').on('input', function () {
        if ($('#home-hero-search').val() == '') {
            $('#search-container > button').removeClass('cross');
            $('#search-container > button').addClass('magnifier');
        }
        else {
            $('#search-container > button').addClass('cross');
            $('#search-container > button').removeClass('magnifier');
        }
    });

    //on click remove text  
    $('.btn-unstyle').click(function () {
        if ($(this).attr('class').indexOf('cross') != -1) {
            $('#home-hero-search').val('');
            $('#search-container-results').css("display", "none");
            $('#search-container > button').removeClass('cross');
            $('#search-container > button').addClass('magnifier');
        }
    });
 
    
});