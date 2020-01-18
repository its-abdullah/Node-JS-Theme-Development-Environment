
var _am = isRtl ? 'م' : 'am';
var _pm = isRtl ? 'ص' : 'am';
var _agencyName = isRtl ? 'AGENCY_NAME_AR' : 'AGENCY_NAME_EN';
var _lblViews = isRtl ? 'المشاهدات' : 'Views';

var ctxSiteViews = document.getElementById("siteviews");//.getContext('2d');
var ctxBrowserViews = document.getElementById("browserviews").getContext('2d');
var ctxCountryViews = document.getElementById("countryviews").getContext('2d');
var ctxDeviceViews = document.getElementById("deviceviews").getContext('2d');
var ctxCityViews = document.getElementById("cityviews").getContext('2d');
var ctxSystemViews = document.getElementById("systemviews").getContext('2d');

const chartOptions = {
    legend: {
        display: true,
        labels: {
            fontColor: '#000',
            fontFamily: '"DroidArabicKufi", sans-serif',
        }
    },
    scales: {
        xAxes: [{

            ticks: {
                beginAtZero: true,
                fontColor: '#000',
                fontFamily: '"DroidArabicKufi","DroidSans", sans-serif',
            },
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true,
                fontColor: '#000',
                fontFamily: '"DroidArabicKufi","DroidSans", sans-serif',
            }
        }]
    },
    tooltips: {
        titleFontFamily: '"DroidArabicKufi","DroidSans", sans-serif'
    }
};
const horizontalBarChartOptions = { legend: { display: false }, scales: { xAxes: [{ display: false }] } }
let chartData = {
    type: 'bar',
    options: chartOptions,
    data: {}
},
    browserChartData = {
        type: "horizontalBar",
        options: horizontalBarChartOptions
    },
    countryChartData = {
        type: "horizontalBar",
        options: horizontalBarChartOptions
    },
    deviceChartData = {
        type: "horizontalBar",
        options: horizontalBarChartOptions
    },
    cityChartData = {
        type: "horizontalBar",
        options: horizontalBarChartOptions
    },
    systemChartData = {
        type: "horizontalBar",
        options: horizontalBarChartOptions
    },
    siteviewChart, browserviewChart, countryviewChart, deviceviewChart, cityviewChart, systemviewChart;


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


        siteviewChart = new Chart(ctxSiteViews, chartData);

        siteviewChart.data = {
            labels: viewsLabel,
            datasets: [{ label: _lblViews, data: viewsData, backgroundColor: '#E4AB25' }]
        };
        siteviewChart.update();
    }
    else {
        document.getElementById('currentViews').classList.add('d-none');
    }
    $("#loader1").addClass('d-none').removeClass('active');
}

function drawBrowserChart(data) {
    let chartLabel = [];
    let chartData = [];
    if (data.length > 0) {
        $.each(data, function (i, e) {
            chartLabel.push(e.BROWSER_NAME);
            chartData.push(e.SUMS);
        });

        browserChartData.data = {
            labels: chartLabel,
            datasets: [{ data: chartData, backgroundColor: '#039747' }]
        };
        browserviewChart = new Chart(ctxBrowserViews, browserChartData);
        browserviewChart.update();
    }
    else {
        browserviewChart.destroy();
    }

    $('#chartBrowser').find('.loader-1').addClass('d-none').removeClass('active');
}
function drawCountryChart(data) {
    let chartLabel = [];
    let chartData = [];
    if (data.length > 0) {

        $.each(data, function (i, e) {
            chartLabel.push(e.COUNTRY_NAME);
            chartData.push(e.SUMS);
        });

        countryChartData.data = {
            labels: chartLabel,
            datasets: [{ data: chartData, backgroundColor: '#039747' }]
        };
        countryviewChart = new Chart(ctxCountryViews, countryChartData);

        countryviewChart.update();
    }
    else {
        countryviewChart.destroy();
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

        deviceChartData.data = {
            labels: chartLabel,
            datasets: [{ data: chartData, backgroundColor: '#039747' }]
        };
        deviceviewChart = new Chart(ctxDeviceViews, deviceChartData);
        deviceviewChart.update();
    }
    else {
        deviceviewChart.destroy();
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

        cityChartData.data = {
            labels: chartLabel,
            datasets: [{ data: chartData, backgroundColor: '#039747' }]
        };
        cityviewChart = new Chart(ctxCityViews, cityChartData);
        cityviewChart.update();
    }
    else {
        cityviewChart.destroy();
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

        systemChartData.data = {
            labels: chartLabel,
            datasets: [{ data: chartData, backgroundColor: '#039747' }]
        };
        systemviewChart = new Chart(ctxSystemViews, systemChartData);
        systemviewChart.update();
    }
    else {
        systemviewChart.destroy();
    }
    $('#chartSystem').find('.loader-1').addClass('d-none').removeClass('active');
}