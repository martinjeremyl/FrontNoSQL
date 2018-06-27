$(document).ready(function() {
    $('#allData').dataTable();
    loadAllData();
});

function loadAllData() {
    $.ajax({
        method: 'get',
        url: 'http://192.168.43.238:8888/ProjetMongo/src/routeur/allData',
        error: function (response) {
            alert('pas cool');
        },
        success: function (data) {
            var table = $('#allData').DataTable();
            data = JSON.parse(JSON.stringify(data));
            $.each(data.data, function (idx, elem) {
                if(elem.company !== undefined && elem.cms !== undefined)
                    table.row.add([elem.company.name, elem.company.address.country, elem.company.turnover, elem.cms.name, elem.cms.domain]).draw().node();
            });
        }
    });
}