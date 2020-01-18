function openChat(lang) {
    window.open('', '_self', '');
    var features = 'location=0,top=0,menubar=0,resizable=0,height=500,width=400,Left=' + (screen.width) * .7;
    window.open('http://199099.gov.sa:89/Code/webchatLogin.php?lang=' + lang, 'mywindow', features);
    return false;
}
function showLevel2(e) {
    if (!e.currentTarget.classList.contains('active')) {
        e.currentTarget.classList.add('active');
        document.getElementsByClassName('cta-level-2')[0].classList.add('active');
    }
    else {
        e.currentTarget.classList.remove('active');
        document.getElementsByClassName('cta-level-2')[0].classList.remove('active');
        document.getElementsByClassName('cta-level-3')[0].classList.remove('active');
    }

    $(".c-f #aamir-form div").show();
    $(".c-f #aamir-form .md-form .form-control").val('');
    $(".c-f #aamir-form .succ-msg").addClass('d-none');
}
function showLevel3(e) {
    document.getElementsByClassName('cta-level-2')[0].classList.remove('active');
    document.getElementsByClassName('cta-level-3')[0].classList.add('active');
}
function goPrevLevel() {
    document.getElementsByClassName('cta-level-3')[0].classList.remove('active');
    document.getElementsByClassName('cta-level-2')[0].classList.add('active');
}
function submitAamirForm() {

    if (validateForm($("#aamir-form"))) {
        $(".c-f #aamir-form div").hide();
        $(".c-f #aamir-form .succ-msg").removeClass('d-none').show();
        return true;
    }
}