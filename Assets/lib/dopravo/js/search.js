

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
        if (searchKeys.reduce((a, c) => a + c).indexOf($this.value) >= 0) {
            $("#search-container-results .results").show();
            $("#search-container-results .no-results").hide();
        }
        else {
            $("#search-container-results .results").hide();
            $("#search-container-results .no-results").show();
        }
    }
    if ($this.value.length < 1) {
        $("#search-container-results").hide();
        $("#search-container-results .results").hide();
        $("#search-container-results .no-results").hide();
    }
}
