const mapStyle = [{ "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#d3d3d3" }] }, { "featureType": "transit", "stylers": [{ "color": "#808080" }, { "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "visibility": "on" }, { "color": "#b3b3b3" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "weight": 1.8 }] }, { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [{ "color": "#d7d7d7" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ebebeb" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#a7a7a7" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#efefef" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#696969" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "visibility": "on" }, { "color": "#737373" }] }, { "featureType": "poi", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{ "color": "#d6d6d6" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, {}, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "color": "#dadada" }] }];
var govAgencies = [], gaLocations = [];
var map, marker, locations, count;
let cachedAgencies = [], cachedLocations = [];

$(function () {

    $('.event-filter-btn').on('click', function () {
        if (!$(this).hasClass('filter-close')) {
            $(this).addClass('filter-close');
            $('.section-filter').addClass('active');
            $('body').addClass('overflow-h');
        }
        else {
            $(this).removeClass('filter-close');
            $('.section-filter').removeClass('active');
            $('body').removeClass('overflow-h');
        }
    });

    $('#btn-close-filter,.btn').on('click', function () {
        $('.event-filter-btn').removeClass('filter-close');
        $('.section-filter').removeClass('active');
        $('body').removeClass('overflow-h');
    });

    if (localStorage.getItem("govAgencies") == null) {
        $.get('/assets/data/entity-locations.json')
            .done(function (data) {

                $.each(data.agencies, function (i, e) {
                    govAgencies.push([e.nameArabic, e.id]);
                });
                $.each(data.locations, function (i, e) {
                    gaLocations.push([e.EntityNameEnglish, e.lat, e.lng]);
                });

                localStorage.setItem('govAgencies', JSON.stringify(data.agencies));
                localStorage.setItem('gaLocations', JSON.stringify(data.locations));

                cachedAgencies = JSON.parse(localStorage.getItem('govAgencies'));
                cachedLocations = JSON.parse(localStorage.getItem('gaLocations'));

                setTimeout(function () {
                    initGovAgencyList(govAgencies);
                    initMap(gaLocations);
                }, 100);
            }).fail(function (e) { console.log(e); });
    }
    else {
        cachedAgencies = JSON.parse(localStorage.getItem('govAgencies'));
        cachedLocations = JSON.parse(localStorage.getItem('gaLocations'));
        initGovAgencyList(cachedAgencies);

        $.each(cachedLocations, function (i, e) {
            gaLocations.push([e.EntityNameEnglish, e.lat, e.lng]);
        });

        initMap(gaLocations);
    }
});

function initGovAgencyList(govAgencies) {
    let _list = govAgencies;
    $.each(_list, function (i, e) {
        $("#govAgencyList").append("<div class=\"custom-control custom-checkbox\">"
            + "<input type='checkbox' class='custom-control-input' data-agencyID='" + e.id + "' id='ga-" + e.id + "'>"
            + "<label class=\"custom-control-label\" for=\"ga-" + e.id + "\">" + e.nameArabic + "</label>"
            + "</div>");
    });
}

function initMap(gaLocations) {
    var myLatLng = { lat: 24.727255, lng: 46.706422 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng, zoom: 11, disableDefaultUI: true,
        styles: mapStyle
    });

    var infowindow = new google.maps.InfoWindow({});

    for (count = 0; count < gaLocations.length; count++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(gaLocations[count][1], gaLocations[count][2]),
            map: map,
            title: gaLocations[count][0]
        });
        google.maps.event.addListener(marker, 'click', (function (marker, count) {
            return function () {
                infowindow.setContent(gaLocations[count][0]);
                infowindow.open(map, marker);
            }
        })(marker, count));
    }

};

$(document).ready(function () {
    let filteredLocs = [];
    setTimeout(function () {
        $("#govAgencyList .custom-checkbox input[type='checkbox']").on('click', function () {
            let _agencyID = parseInt($(this).attr('data-agencyID'));
            let mapLoc = [];
            if ($.inArray(_agencyID, filteredLocs) >= 0) {
                let i = filteredLocs.indexOf(_agencyID);
                filteredLocs.splice(i, 1);
            } else {
                filteredLocs.push(_agencyID);
            }
            $.each(cachedLocations, function (i, e) {
                $.each(filteredLocs, function (i, f) {
                    if (e.agencyID == f) {
                        mapLoc.push([e.EntityNameArabic, e.lat, e.lng, e.agencyID]);
                    }
                });
            });

            initMap(mapLoc);
        });

    }, 500);
})
