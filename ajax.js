function envoieAjax(param)
{
    param['url'] = "http://192.168.43.238:8888/ProjetMongo/src/routeur/"+param['url'];
    param['datatype'] = "json";
    $.ajax(param);
}

function getAllData()
{
    $('#cache').toggleClass('dnone');
    envoieAjax({
        type: 'GET',
        url: "allData",
        success: function(data) {
            console.log(data);
        },
        complete: function () {
            $('#cache').toggleClass('dnone');
        }
    });
}

function toggleFormAjout()
{
   $('#containerTable, #formAjout').toggleClass('dnone');
}

function createData()
{
    $('#cache').toggleClass('dnone');

    envoieAjax({
        type: 'POST',
        url: "newData",
        data: {
            datas: $('#formAjout').serializeArray()
        },
        success: function(data) {
            if(parseInt(data.status) !== 1) {
                alert('Error '+data.status+' : '+data.message);
            }
        },
        complete: function () {
            $('#cache').toggleClass('dnone');
        }
    });

    return false;
}