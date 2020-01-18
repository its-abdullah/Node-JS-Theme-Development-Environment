$(function () {
    $('a[data-templateType]').on("click", function (e) {
        $('a[data-templateType]').removeClass('active');
        updateContainerView("#" + e.currentTarget.getAttribute('data-updateContainerId'), e.currentTarget.getAttribute('data-templateType'), e.currentTarget);
    });

    checkCookie();

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

    $('#btn-close-filter').on('click', function () {
        $('.event-filter-btn').removeClass('filter-close');
        $('.section-filter').removeClass('active');
        $('body').removeClass('overflow-h');
    });

    var citySelectedList = [];

    $('#cityList').on('change', function () {
        $(".city-events-list .select-dropdown").val('ابحث عن طريق اسم المدينة');
        $('#city-list').empty();
        citySelectedList = $(this)[0].selectedOptions;
        $.each(citySelectedList, function (i, e) {
            if ($(e).val() != -1)
                $('#city-list').append('<li data-cityId=' + $(e).val() + '>' + $(e).attr('data-text') + '</li>');
        });
        if ($('#city-list li').length > 0)
            $('#city-list').next('p').removeClass('d-none');
        else
            $('#city-list').next('p').addClass('d-none');
    });
});


function updateContainerView(templateContainerId, templateType, e) {
    if (!e.classList.contains('active'))
        e.classList.add('active');

    if (templateType === 'grid') {
        setCookie("event-list-view-clicked", false, 1);
        setCookie("event-grid-view-clicked", true, 1);

        return $(templateContainerId).addClass('gridView').removeClass('listView');
    }
    setCookie("event-list-view-clicked", true, 1);
    setCookie("event-grid-view-clicked", false, 1);
    return $(templateContainerId).addClass('listView').removeClass('gridView');
}

function checkCookie() {
    if (getCookie('event-list-view-clicked') === 'true') {
        if (window.innerWidth > 768) {
            $('.list-view').addClass('active');
            $('.grid-view').removeClass('active');
            $('#list-grid-view').addClass('listView').removeClass('gridView');
        }
        else {
            $('#list-grid-view').addClass('gridView').removeClass('listView');
        }
    }
    if (getCookie('event-grid-view-clicked') === 'true') {
        if (window.innerWidth > 768) {
            $('.grid-view').addClass('active');
            $('.list-view').removeClass('active');
            $('#list-grid-view').addClass('gridView').removeClass('listView');
        }
    }
}

$(window).resize(function () {
    checkCookie();
});
