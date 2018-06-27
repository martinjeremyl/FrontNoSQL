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
   $('#formAjout, #example').toggleClass('dnone');
}

function createData()
{
    $('#cache').toggleClass('dnone');

    var data = {};

    $('#formAjout').serializeArray().map(function(x) {
        data[x.name] = x.value;
    });

    envoieAjax({
        type: 'POST',
        url: "newData",
        data: {
            datas: data
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