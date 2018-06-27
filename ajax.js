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

    var data = {};

    $('#formAjout').serializeArray().map(function(x) {
        var res = x.name.split('$$');
        if(typeof data[res[0]] === "undefined") {
            data[res[0]] = {};
        }
        data[res[0]][res[1]] = x.value
    });

    envoieAjax({
        type: 'POST',
        url: "newData",
        data: {
            datas: JSON.stringify(data)
        },
        success: function(data) {
            if(parseInt(data.status) !== 1) {
                alert('Error '+data.status+' : '+data.message);
            }
            else {
                alert('Success : '+data.message);
            }
        },
        complete: function () {
            $('#cache').toggleClass('dnone');
        }
    });

    return false;
}