function envoieAjax(param)
{
    param['url'] = "http://192.168.43.238:8888/ProjetMongo/src/routeur/"+param['url'];
    param['datatype'] = "json";
    $.ajax(param);
}

function toggleFormAjout()
{
    var form = $('#formAjout');

    form[0].reset();
    form.attr('data-id', data._id.$oid);
    $('#containerTable, #formAjout').toggleClass('dnone');
}

function gestionData()
{
    var data = {},
        form = $('#formAjout'),
        id = parseInt(form.attr('data-id'));

    form.serializeArray().map(function(x) {
        var res = x.name.split('$$');
        if(typeof data[res[0]] === "undefined") {
            data[res[0]] = {};
        }
        data[res[0]][res[1]] = x.value
    });

    isNaN(id) || id === 0 ?
        createData(data) :
        modificationData(id, data);

    return false;
}

/**
 * @param {Array} data
 */
function createData(data)
{
    $('#cache').toggleClass('dnone');

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
                toggleFormAjout();
                loadAllData();
                alert('Success : '+data.message);
            }
        },
        complete: function () {
            $('#cache').toggleClass('dnone');
        }
    });
}

/**
 * @param {string} id
 * @param {Array} data
 */
function modificationData(id, data)
{
    $('#cache').toggleClass('dnone');
    envoieAjax({
        type: 'POST',
        url: id+"/updateData",
        data: {
            datas: JSON.stringify(data)
        },
        success: function(data) {
            if(parseInt(data.status) !== 1) {
                alert('Error '+data.status+' : '+data.message);
            }
            else {
                toggleFormAjout();
                loadAllData();
                alert('Success : '+data.message);
            }
        },
        complete: function () {
            $('#cache').toggleClass('dnone');
        }
    });
}

/**
 * @param {string} id
 */
function affichageModificationElem(id)
{
    $('#cache').toggleClass('dnone');
    envoieAjax({
        type: 'GET',
        url: id+"/getData",
        success: function(data) {
            if(parseInt(data.status) !== 1) {
                alert('Error '+data.status+' : '+data.message);
            }
            else {
                alert('Success : '+data.message);
                $('#formAjout').attr('data-id', data._id.$oid);
                $('#nomCms').val(data.cms.name);
                $('#urlCms').val(data.cms.url);
                $('#versionCms').val(data.cms.version);
                $('#domaineCms').val(data.cms.domain);
                $('#pluginsCms').val(data.cms.plugin);
                $('#mailOwner').val(data.owner.email);
                $('#prenomOwner').val(data.owner.firstname);
                $('#nomOwner').val(data.owner.lastname);
                $('#phoneOwner').val(data.owner.phone);
                $('#nomCompany').val(data.company.name);
                $('#caCompany').val(data.company.turnover);
                $('#paysCompany').val(data.company.country);
                $('#adresseCompany').val(data.company.location);
                toggleFormAjout();
            }
        },
        complete: function () {
            $('#cache').toggleClass('dnone');
        }
    });
}

/**
 * @param {string} id
 */
function supprElement(id)
{
    $('#cache').toggleClass('dnone');
    envoieAjax({
        type: 'DELETE',
        url: id+"/removeData",
        success: function(data) {
            if(parseInt(data.status) !== 1) {
                alert('Error '+data.status+' : '+data.message);
            }
            else {
                alert('Success : '+data.message);
                loadAllData();
            }
        },
        complete: function () {
            $('#cache').toggleClass('dnone');
        }
    });
}