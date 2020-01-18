$(document).ready(function () {
    //typewrite

    let elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-type');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    const service = {
        logo: '/assets/img/treex2.png',
        nameArabic: 'الكل',
        nameEnglish: 'All',
        servicesCount: 2010
    }

    $("#filter-service").on('change', function () {
        if ($(this).val() !== "") {
            const selectedService = {
                logo: '/assets/img/health.svg',
                nameArabic: 'الصحة',
                nameEnglish: 'Health',
                servicesCount: 684
            }
            $('.service-category img').attr('src', selectedService.logo);
            $('.service-category em').html(selectedService.nameArabic);
            $('.service-list-count em').html(selectedService.servicesCount);
            $('.category-service-list,.search-results,.filter-1').show();
            $('.filter-1').show();
            $('#filter-1').html("<div class='chip'>" + selectedService.nameArabic + " <a class='aclose'><i class='fa fa-times'></i></a></div>");
        }
        else {
            $('.service-category img').attr('src', service.logo);
            $('.service-category em').html(service.nameArabic);
            $('.service-list-count em').html(service.servicesCount);
            $('.category-service-list,.search-results,.filter-1,.filter-2').hide();
            $('#filter-1').html('');
        }
    });

    $('.category-service-list .card-body a').on('click', function () {
        $('.category-service-list .card-body li').removeClass('active');
        if (!$(this).parent().hasClass('.active')) {
            $(this).parent().addClass('active');
            $('.service-list-count em').html($(this).attr('data-service-count'));
            $('.filter-2').show();
            $('#filter-2').html("<div class='chip'>" + $.trim($(this).html()) + " <a class='aclose'><i class='fa fa-times'></i></a></div>");
        }
        else {
            $('#filter-2').html('');
        }
        if (isMobile) {
            $("html, body").animate({ scrollTop: $('#intro-contents').offset().top });
        }
        $(".search-results .chip:not(:last) .aclose").hide();
    });
    setTimeout(function () {
        $(document).on("click", ".search-results .chip .aclose", function () {
            $(this).parent('.chip').remove();
            $(".search-results .chip .aclose").show();
            $(".search-results .chip:not(:last) .aclose").hide();
            $('.service-list-count em').html("684");//demo purpose only
            if ($('#filter-1').is(':empty')) {
                $('.filter-1').hide();
                $("#filter-service").val("").change();
            }
            if ($('#filter-2').is(':empty'))
                $('.filter-2').hide();
        });
    }, 200);

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