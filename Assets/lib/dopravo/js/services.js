$(function () {
    $('#related-services .box-w-hover').hover(
        function () {
            $(this).find('.desc').animate({
                opacity: 1,
                marginTop: '5px'
            }, 200);
        }, function () {
            $(this).find('.desc').animate({
                opacity: 0,
                marginTop: '-50px'
            }, 100);
        });
});

$(window).scroll(function () {
    let scrollPosition = $(window).scrollTop() >= $('#formSteps').offset().top;
    // if ($('#related-services').isInViewport()) {
    //     showAamirContainer(true);
    //   } else {
    //     showAamirContainer(false);
    //   }

    showAamirContainer(scrollPosition);
});

function showAamirContainer(isShow) {
    if (isShow) {
        $("div.aamir-cta").stop().addClass('active');
    }
    else {
        $("div.aamir-cta").stop().removeClass('active');
    }
}

function showFeedbackForm(e) {
    e.currentTarget.classList.add('active');
    let formId = e.currentTarget.getAttribute('data-formId');
    $('#' + formId).removeClass('d-none');
}
function hideFeedbackForm(e) {
    $('[data-formId]').removeClass('active');
    let formId = e.currentTarget.getAttribute('data-formId');
    $('#' + formId).addClass('d-none');
}
function submitFeedbackForm(e) {
    let myForm = $(e.currentTarget);
    let textArea = myForm.parent().find('textarea').val();
    if (textArea.length == 0)
        $('span.error-msg').removeClass('d-none');
    else {
        textArea = '';
        myForm.parent().toggleClass('d-none d-flex');
        myForm.parent().next('div').removeClass('d-none');
        let thankYouMsg = myForm.parents('.my-form').find('h5').attr('data-thankYou');
        myForm.parents('.my-form').find('h5').addClass('alert alert-success').html(thankYouMsg);
        $('span.error-msg').addClass('d-none');
        $('[data-formId]').removeClass('active');
    }
}

$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};