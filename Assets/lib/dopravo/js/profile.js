
let serviceList = [];

$(function () {


    $.get('/assets/data/services.json')
        .done(function (data) {
            $.each(data.services, function (i, e) {
                serviceList.push(e);
            });
        })
        .fail(function (e) { console.log(e); });

    $('a[data-service-id]').on('click', function () {
        $('.loader-1').removeClass('d-none');
        $('.service-details').addClass('d-none');

        $('.accordion .card-body ul li').removeClass('active');
        $(this).parent('li').addClass('active');
        let serviceId = $(this).attr('data-service-id');
        const serviceObj = serviceList.filter(s => s.ID == parseInt(serviceId))[0];

        document.getElementById('pp-title').innerText = serviceObj.ServiceNameArabic;
        document.getElementById('pp-entityLogo').src = '/assets/img/ministry-logos/' + serviceObj.EntityLogo;
        document.getElementById('pp-entityLogo').alt = serviceObj.EntityNameArabic;
        document.getElementById('pp-entityName').innerText = serviceObj.EntityNameArabic;

        setTimeout(function () {
            $('.loader-1').addClass('d-none'); $('.service-details').removeClass('d-none');
        }, 200);

        if (window.innerWidth < 767) {
            $("html, body").animate({ scrollTop: $("#service-pp-details").offset().top });
        }

        return false;
    });


    var selected = [];

    $("#modalSubscriptionForm .btn-grd").on("click", function () {

        $('#modalSubscriptionForm input:checked').each(function () {
            selected.push($(this).next('label').text());
        });
        if (selected.length > 0) {
            $("#modalSubscriptionForm .modal-body .modal-form-fields").hide();
            $("#modalSubscriptionForm .modal-body .succ-msg").removeClass('d-none');
            setTimeout(function () {
                $("#modalSubscriptionForm [data-dismiss=modal]").click();
            }, 2000);

            setTimeout(function () {
                $("#modalSubscriptionForm .modal-body .modal-form-fields").show();
                $("#modalSubscriptionForm .modal-body .succ-msg").addClass('d-none');
                $("#modalSubscriptionForm .modal-body .err-msg").addClass('d-none');
            }, 3000);
        }
        else {
            $("#modalSubscriptionForm .modal-body .err-msg").removeClass('d-none');
        }

    });


})