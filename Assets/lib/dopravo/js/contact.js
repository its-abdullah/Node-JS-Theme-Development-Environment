


let element = document.getElementsByClassName('btn-contact');
function onContactSubmit() {
    setTimeout(function () {
        window.location.href = "/ar/contact/thankyou.html";
    }, 10);
}
function validate(event) {
    if (validateForm($("#contact-form")) == true && document.getElementById("crSubjectID").value != "") {
        onContactSubmit(true);
        return true;
    }
    // $("label.lbError").removeClass("d-none").html("<em><span>" + site.messages().required + "</span></em>");
    // return false;
}
function onContactload(e) {
    element.onclick = validate(element);
}

$(function () {
    $(".site-ie9 .my-btn-group .btn").on("click", function () {
        $(".site-ie9 .my-btn-group .btn").removeClass("selected");
        $(this).addClass("selected");
        var cs = $(this).find("input[type=radio]").attr("data-value");
        document.getElementById("crSubjectID").value = cs;
        console.log(document.getElementById("crSubjectID").value);
    });

    $("#contactSubjectList").on("change", function () {
        var cs = $(this).find("input[type=radio][name='contactSubject']:checked").attr("data-value");
        document.getElementById("crSubjectID").value = cs;
    });

    $('[data-targetDiv]').on("click", function (e) {
        let scrollTo = $(e.currentTarget).attr('data-targetDiv');
        $("html, body").animate({ scrollTop: $("#" + scrollTo).offset().top });
    })

});
