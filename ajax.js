function envoieAjax(param)
{
    param['url'] = "http://192.168.43.238:8888/ProjetMongo/src/routeur/"+param['url'];
    $.ajax(param);
}

function getAllData()
{
    envoieAjax({
        dataType: 'json',
        type: 'GET',
        url: "allData",
        success: function(data) {
            console.log(data);
        }
    });
}