
var _am = isRtl ? 'م' : 'am';
var _pm = isRtl ? 'ص' : 'am';
var _agencyName = isRtl ? 'AGENCY_NAME_AR' : 'AGENCY_NAME';
var _lblViews = isRtl ? 'المشاهدات' : 'Views';
var _noRecords = isRtl ? 'لا يوجد نتائج' : 'No Results';

$(function () {


    $('[data-model=chartjs]').find('.loader-1').removeClass('d-none').addClass('active');
    $("#loader1").removeClass('d-none').addClass('active');

    getAgencies('AGENCY', 'ALL');

    drawStatisticChart('VIEWS', 'ALL');
    drawStatisticChart('BROWSERS', 'ALL');
    drawStatisticChart('COUNTRIES', 'ALL');
    drawStatisticChart('DEVICES', 'ALL');
    drawStatisticChart('CITIES', 'ALL');
    drawStatisticChart('OPERATING_SYSTEMS', 'ALL');
});

function getAgencies(type, agency) {
    let agencyList = localStorage.getItem('agencyList');
    if (agencyList === null) {
        $.get('https://www.saudi.gov.sa/wps/PA_google/API?type=' + type + '&time=30DAYS&agencyID=' + agency)
            .done(function (data) {
                let agencies = JSON.stringify(data.data);
                localStorage.setItem('agencyList', agencies);
            })
            .fail(function (e) { console.log(e); })
    }
    let agencyListSelect = JSON.parse(agencyList);
    agencyListSelect.forEach(function (i) {
        $('#agencyList').append($('<option>', { value: i['AGENCY_ID'], text: i[_agencyName] }));
    });
}

function updateStatistics(e) {

    $('[data-model=chartjs]').find('.loader-1').removeClass('d-none').addClass('active');
    $("#loader1").removeClass('d-none').addClass('active');

    let _agencyID = e.currentTarget.value;
    drawStatisticChart('VIEWS', _agencyID);
    drawStatisticChart('BROWSERS', _agencyID);
    drawStatisticChart('COUNTRIES', _agencyID);
    drawStatisticChart('DEVICES', _agencyID);
    drawStatisticChart('CITIES', _agencyID);
    drawStatisticChart('OPERATING_SYSTEMS', _agencyID);
    if (e.currentTarget.selectedIndex != -1)
        document.getElementById('portalName').innerText = document.getElementById('agencyList').options[e.currentTarget.selectedIndex].text;
}

function drawStatisticChart(type, agency) {
    $.get('https://www.saudi.gov.sa/wps/PA_google/API?type=' + type + '&time=30DAYS&agencyID=' + agency)
        .done(function (data) {
            if (type === 'VIEWS')
                drawSiteChart(data.data);
            if (type === 'BROWSERS')
                drawBrowserChart(data.data);
            if (type === 'COUNTRIES')
                drawCountryChart(data.data);
            if (type === 'DEVICES')
                drawDeviceChart(data.data);
            if (type === 'CITIES')
                drawCityChart(data.data);
            if (type === 'OPERATING_SYSTEMS')
                drawSystemChart(data.data);
        })
        .fail(function (e) { console.log(e); });
}

function drawSiteChart(data) {
    let viewsLabel = [], viewsData = [];
    if (data.length > 0) {
        $.each(data, function (i, e) {
            var h = e.HOURS % 12 || 12;
            var ampm = (e.HOURS < 12) ? _am : _pm;
            var title = h + ' ' + ampm;
            viewsLabel.push(title);
            viewsData.push(e.SUMS);
        });
        document.getElementById('currentViews').classList.remove('d-none');

        if (viewsData.indexOf(0) > 0)
            document.getElementById('currentViews').innerText = viewsData[Math.abs(viewsData.indexOf(0) - 1)];
        else
            document.getElementById('currentViews').innerText = viewsData[viewsData.length - 1];

        updateBarChart('siteviews', viewsLabel, viewsData);
    }
    else {
        document.getElementById('currentViews').classList.add('d-none');
        $('#siteviews').html(_noRecords);
    }
    $("#loader1").addClass('d-none').removeClass('active');
}

function drawBrowserChart(data) {
    let chartLabel = [];
    let chartData = [];
    if (data.length > 0) {
        $.each(data, function (i, e) {
            if (e.SUMS > 500) {
                chartLabel.push(e.BROWSER_NAME);
                chartData.push(e.SUMS);
            }
        });
        updateChart('browserviews', chartLabel, chartData);
    }
    else {
        $('#browserviews').html(_noRecords);
    }

    $('#chartBrowser').find('.loader-1').addClass('d-none').removeClass('active');
}
function drawCountryChart(data) {
    let chartLabel = [];
    let chartData = [];
    if (data.length > 0) {

        $.each(data, function (i, e) {
            if (e.SUMS > 500) {
                chartLabel.push(e.COUNTRY_NAME);
                chartData.push(e.SUMS);
            }
        });
        updateChart('countryviews', chartLabel, chartData);
    }
    else {
        $('#countryviews').html(_noRecords);
    }
    $('#chartCountry').find('.loader-1').addClass('d-none').removeClass('active');
}

function drawDeviceChart(data) {
    let chartLabel = [];
    let chartData = [];
    if (data.length > 0) {
        $.each(data, function (i, e) {
            chartLabel.push(e.DEVICE_NAME);
            chartData.push(e.SUMS);
        });
        updateChart('deviceviews', chartLabel, chartData);
    }
    else {
        $('#deviceviews').html(_noRecords);
    }
    $('#chartDevices').find('.loader-1').addClass('d-none').removeClass('active');
}

function drawCityChart(data) {
    let chartLabel = [];
    let chartData = [];
    if (data.length > 0) {
        $.each(data, function (i, e) {
            if (e.SUMS > 1000) {
                chartLabel.push(e.CITY_NAME);
                chartData.push(e.SUMS);
            }
        });
        updateChart('cityviews', chartLabel, chartData);
    }
    else {
        $('#cityviews').html(_noRecords);
    }
    $('#chartCities').find('.loader-1').addClass('d-none').removeClass('active');
}

function drawSystemChart(data) {
    let chartLabel = [];
    let chartData = [];
    if (data.length > 0) {
        $.each(data, function (i, e) {
            chartLabel.push(e.OPERATING_SYSTEM_NAME);
            chartData.push(e.SUMS);
        });
        updateChart('systemviews', chartLabel, chartData);
    }
    else {
        $('#systemviews').html(_noRecords);
    }
    $('#chartSystem').find('.loader-1').addClass('d-none').removeClass('active');
}

function updateBarChart(container, title, data) {
    Highcharts.chart(container, {
        chart: { type: 'column', backgroundColor: '', style: { fontFamily: '"DroidArabicKufi","DroidSans", sans-serif' } },
        title: { text: '' },
        xAxis: { categories: title, reversed: isRtl },
        yAxis: { opposite: isRtl, title: { text: '' } },
        credits: { enabled: false },
        series: [{ data: data, color: '#F7C859' }],
        legend: false
    });
}

function updateChart(container, title, data) {
    Highcharts.chart(container, {
        chart: { type: 'bar', backgroundColor: '', style: { fontFamily: '"DroidArabicKufi","DroidSans", sans-serif' } },
        title: { text: '' },
        xAxis: { categories: title, opposite: isRtl },
        yAxis: { reversed: isRtl, title: { text: '' } },
        credits: { enabled: false },
        plotOptions: { bar: { dataLabels: { enabled: true } } },
        series: [{ data: data, color: '#039747' }],
        legend: false
    });
}