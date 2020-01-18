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
    
    $('.grid').masonry({
        columnWidth: 300,
        itemSelector: '.grid-item',
        horizontalOrder: true,
        gutter: 5,
        originLeft: isRtl ? false : true
    });

});


function updateContainerView(templateContainerId, templateType, e) {
    if (!e.classList.contains('active'))
        e.classList.add('active');

    if (templateType === 'grid') {
        setCookie("news-list-view-clicked", false, 1);
        setCookie("news-grid-view-clicked", true, 1);

        return $(templateContainerId).addClass('gridView').removeClass('listView');
    }
    setCookie("news-list-view-clicked", true, 1);
    setCookie("news-grid-view-clicked", false, 1);
    return $(templateContainerId).addClass('listView').removeClass('gridView');
}

function checkCookie() {
    if (getCookie('news-list-view-clicked') === 'true') {
        if (window.innerWidth > 768) {
            $('.list-view').addClass('active');
            $('.grid-view').removeClass('active');
            $('#list-grid-view').addClass('listView').removeClass('gridView');
        }
        else {
            $('#list-grid-view').addClass('gridView').removeClass('listView');
        }
    }
    if (getCookie('news-grid-view-clicked') === 'true') {
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