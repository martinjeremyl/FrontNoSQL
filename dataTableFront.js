$(document).ready(function() {
    $('#allData').dataTable({
        "language": {
            "lengthMenu": "Afficher _MENU_ lignes par page",
            "zeroRecords": "Aucun résultats",
            "info": "Affichage de la page _PAGE_ sur _PAGES_",
            "infoEmpty": "Aucun résultats",
            "infoFiltered": "(_MAX_ lignes filtrés)",
            "paginate": {
                "previous": "Prêcêdent",
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
                var actionDiv = '';
                if(elem.company !== undefined && elem.cms !== undefined)
                    var divAction = "<i class=\"fas fa-pencil-alt\" onclick=\"affichageModificationElem('"+elem._id.$oid+"')\"></i><i class=\"fas fa-times\" onclick=\"supprElement('"+elem._id.$oid+"')\"></i>";
                table.row.add([elem.company.name, elem.company.country, elem.company.turnover, elem.cms.name, elem.cms.version, elem.cms.domain, divAction]).draw().node();
            });
        }
    });
}