$(document).ready(function() {
    $('#allData').dataTable({
        "language": {
            "lengthMenu": "Afficher _MENU_ lignes par page",
            "zeroRecords": "Aucun résultats",
            "info": "Affichage de la page _PAGE_ sur _PAGES_",
            "infoEmpty": "Aucun résultats",
            "infoFiltered": "(_MAX_ lignes filtrés)",
            "paginate": {
                "previous": "Précédent",
                "next": "Suivant"
            },
            "search": "Rechercher :"
        }
    });
    loadAllData();
});

function loadAllData() {
    $('#cache').toggleClass('dnone');
    envoieAjax({
        method: 'get',
        url: 'allData',
        success: function (data) {
            var table = $('#allData').DataTable();
            table.clear().draw();
            data = JSON.parse(JSON.stringify(data));
            $.each(data.data, function (idx, elem) {
                if(elem.company !== undefined && elem.cms !== undefined) {
                    var divAction = "<i class=\"fas fa-pencil-alt\" onclick=\"affichageModificationElem('"+elem._id.$oid+"')\"></i><i class=\"fas fa-times\" onclick=\"supprElement('"+elem._id.$oid+"')\"></i>";
                    table.row.add([elem.company.name, elem.company.country, elem.company.turnover, elem.cms.name, elem.cms.version, elem.cms.domain, divAction]).draw().node();
                }
            });
        },
        complete: function () {
            $('#cache').toggleClass('dnone');
        }
    });
}