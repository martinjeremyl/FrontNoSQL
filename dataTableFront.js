$(document).ready(function() {
    $('#allData').dataTable({
        "language": {
            "lengthMenu": "Afficher _MENU_ lignes par page",
            "zeroRecords": "Aucun résultats",
            "info": "Affichage de la page _PAGE_ sur _PAGES_",
            "infoEmpty": "Aucun résultats",
            "infoFiltered": "(_MAX_ lignes filtrés)",
            "paginate": {
                "previous": "Precedent",
                "next": "Suivant"
            },
            "search": "Rechercher :"
        }
    });
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
                    table.row.add([elem.company.name, elem.company.address.country, elem.company.turnover, elem.cms.name, elem.cms.version, elem.cms.domain]).draw().node();
            });
        }
    });
}