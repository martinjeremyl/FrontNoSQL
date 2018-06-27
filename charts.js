function loadCMSPieChart () {
    $.ajax(function ())
    const data = {
        datasets: [{
            data: [10, 20, 30]
        }],
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    };
    const cmsPieChart = new Chart(ctx,{
        type: 'pie',
        data: data,
        options: options
    });
    return 'trois';
}
