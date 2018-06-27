function envoieAjax(param)
{
    param['url'] = "http://192.168.43.238:8888/ProjetMongo/src/routeur/"+param['url'];
    param['dataType'] = "json";
    $.ajax(param);
}

function getAllData()
{
    $('#cache').toggleClass('dnone');
    envoieAjax({
        type: 'GET',
        url: "allData",
        success: function(data) {
            Object.keys(data.data).map(function(index) {

            })
        },
        complete: function () {
            $('#cache').toggleClass('dnone');
        }
    });
}

function toggleFormAjout()
{
   $('#formAjout, #example').toggleClass('dnone');
}