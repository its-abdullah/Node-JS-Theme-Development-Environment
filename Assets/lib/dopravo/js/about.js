$(function () {
    if ($('#myeSTab').length > 0) {
        $('#myeSTab > li:first').addClass('selected');
        $('#myeSTab > li > a').on('click', function () {
            let $this = $(this).parent();
            $('#myeSTab > li').removeClass('selected');
            if (!$this.hasClass('selected')) {
                $this.addClass('selected');
            }
        });
    }
    $("#my-chart-filter").on("change", function () {
        let $thisVal = $(this).val();
        if ($thisVal !== "") {
            $(".my-d-charts").hide();
            $("#" + $(this).val()).show();
        }
        else {
            $(".my-d-charts").show();
        }
    });
    //doughnut
    var ctxD = document.getElementById("doughnutChart1").getContext('2d');
    window.myDoughnutChart1 = new Chart(ctxD, {
        type: 'doughnut',
        data: {
            labels: ["الخدمات الحكومية التقليدية", "الخدمات الحكومية الإلكترونية"],
            datasets: [
                {
                    data: [55, 45],
                    backgroundColor: ["#E7BB53", "#36A569"]
                }
            ]
        },
        options: {
            responsive: true,
            tooltips: {
                enabled: false
            },
            elements: {
                arc: {
                    borderWidth: 0
                }
            },
            legend: {
                display: false,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    fontColor: '#000',
                    fontFamily: '"DroidArabicKufi", sans-serif',
                },
                legendItems: {
                    lineWidth: 0
                }
            },
            plugins: {
                labels: {
                    render: 'percentage',
                    fontColor: ['white', 'white'],
                    precision: 2,
                    fontFamily: '"Lucida Console", Monaco, monospace'

                }
            }
            // , legendCallback: function (chart) {
            //     console.log(chart)
            // }
        }
    });//.generateLegend();


    var ctxD2 = document.getElementById("doughnutChart2").getContext('2d');
    window.myDoughnutChart2 = new Chart(ctxD2, {
        type: 'doughnut',
        data: {
            labels: ["الخدمات (حكومة - أعمال) (G-B)",
                "الخدمات (حكومة - أفراد) (G-C)",
                "الخدمات التي تقدم لجميع أنواع المستفيدين (G-C,G-B,G-G)",
                "الخدمات (حكومة - حكومة) (G-G)"],
            datasets: [
                {
                    data: [45, 15, 28, 12],
                    backgroundColor: ["#D3CB69", "#7DB442", "#ACDD78", "#F6C960"]
                }
            ]
        },
        options: {
            responsive: true,
            tooltips: {
                enabled: false
            },
            elements: {
                arc: {
                    borderWidth: 0
                }
            },
            legend: {
                display: false,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    fontColor: '#000',
                    fontFamily: '"DroidArabicKufi", sans-serif',
                },
                legendItems: {
                    lineWidth: 0
                }
            },
            plugins: {
                labels: {
                    render: 'percentage',
                    fontColor: ['white', 'white'],
                    precision: 2,
                    fontFamily: '"Lucida Console", Monaco, monospace'

                }
            }
        }
    });

    var ctxD3 = document.getElementById("doughnutChart3").getContext('2d');
    window.myDoughnutChart3 = new Chart(ctxD3, {
        type: 'doughnut',
        data: {
            labels: ["الخدمات التكاملية",
                "الخدمات الإجرائية",
                "الخدمات التفاعلية",
                "الخدمات المعلوماتية"],
            datasets: [
                {
                    data: [45, 15, 28, 12],
                    backgroundColor: ["#D3CB69", "#7DB442", "#ACDD78", "#F6C960"]
                }
            ]
        },
        options: {
            responsive: true,
            tooltips: {
                enabled: false
            },
            elements: {
                arc: {
                    borderWidth: 0
                }
            },
            legend: {
                display: false,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    fontColor: '#000',
                    fontFamily: '"DroidArabicKufi", sans-serif',
                },
                legendItems: {
                    lineWidth: 0
                }
            },
            plugins: {
                labels: {
                    render: 'percentage',
                    fontColor: ['white', 'white'],
                    precision: 2,
                    fontFamily: '"Lucida Console", Monaco, monospace'

                }
            }
        }
    });

    document.getElementById('chart1-legend').innerHTML = myDoughnutChart1.generateLegend();
    document.getElementById('chart2-legend').innerHTML = myDoughnutChart2.generateLegend();
    document.getElementById('chart3-legend').innerHTML = myDoughnutChart3.generateLegend();
    
    $("#chart1-legend > ul > li").on("click", function (e) {
        let index = $(this).index();
        $(this).toggleClass("strike")
        let ci = e.view.myDoughnutChart1;
        let curr = ci.data.datasets[0]._meta[0].data[index];
        curr.hidden = !curr.hidden;
        ci.update();
    });

    $("#chart2-legend > ul > li").on("click", function (e) {
        let index = $(this).index();
        $(this).toggleClass("strike")
        let ci = e.view.myDoughnutChart2;
        let curr = ci.data.datasets[0]._meta[1].data[index];
        curr.hidden = !curr.hidden;
        ci.update();
    });
    $("#chart3-legend > ul > li").on("click", function (e) {
        let index = $(this).index();
        $(this).toggleClass("strike")
        let ci = e.view.myDoughnutChart3;
        let curr = ci.data.datasets[0]._meta[2].data[index];
        curr.hidden = !curr.hidden;
        ci.update();
    });

})
