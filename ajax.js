function envoieAjax(param)
{
    param['url'] = "http://192.168.43.238:8888/ProjetMongo/src/routeur/"+param['url'];
    param['datatype'] = "json";
    $.ajax(param);
}

function toggleFormAjout(clear_data_id)
{
    var form = $('#formAjout');

    if(typeof clear_data_id === "undefined" || clear_data_id) {
        form[0].reset();
        form.removeAttr('data-id');
    }

    $('#containerTable, #formAjout').toggleClass('dnone');
}



function gestionData()
{
    var data = {},
        form = $('#formAjout'),
        id = form.attr('data-id');

    form.serializeArray().map(function(x) {
        var res = x.name.split('$$');
        if(typeof data[res[0]] === "undefined") {
            data[res[0]] = {};
        }
        data[res[0]][res[1]] = x.value
    });

    typeof id === "undefined" || id === '' ?
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
    console.log(encodeURI(JSON.stringify(data)));
    $('#cache').toggleClass('dnone');
    envoieAjax({
        type: 'PUT',
        url: id+"/updateData",
        data: JSON.stringify(data),
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
                $('#formAjout').attr('data-id', data.data._id.$oid);
                $('#nomCms').val(data.data.cms.name);
                $('#urlCms').val(data.data.cms.url);
                $('#versionCms').val(data.data.cms.version);
                $('#domaineCms').val(data.data.cms.domain);
                $('#pluginsCms').val(data.data.cms.plugin);
                $('#mailOwner').val(data.data.owner.email);
                $('#prenomOwner').val(data.data.owner.firstname);
                $('#nomOwner').val(data.data.owner.lastname);
                $('#phoneOwner').val(data.data.owner.phone);
                $('#nomCompany').val(data.data.company.name);
                $('#caCompany').val(data.data.company.turnover);
                $('#paysCompany').val(data.data.company.country);
                $('#adresseCompany').val(data.data.company.location);
                toggleFormAjout(false);
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

function loadCmsStats() {
    envoieAjax({
        type: 'GET',
        url: "cms.name/countResult",
        async: false,
        success: function (data) {
            data = data.data;
            var datasets = [];
            var labels = [];
            var result = {};
            $.each(data, function (idx, elem) {
                datasets.push(elem.count);
                labels.push(elem._id.filtre);
            })
            result.datasets = datasets;
            result.labels = labels;
            var ctx = $('#cmsChart');
            console.log(result);
            if(result !== false) {
                const data = {
                    datasets: [{
                        label: 'Répartition des CMS',
                        data: result.datasets,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(78, 162, 47, 0.2)',
                            'rgba(96, 63, 36, 0.2)',
                            'rgba(12, 94, 147, 0.2)',
                            'rgba(54, 130, 96, 0.2)',
                            'rgba(20, 16, 145, 0.2)'

                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(78, 162, 47, 1)',
                            'rgba(96, 63, 36, 1)',
                            'rgba(12, 94, 147, 1)',
                            'rgba(54, 130, 96, 1)',
                            'rgba(20, 16, 145, 1)'
                        ]
                    }],
                    labels: result.labels
                };
                const cmsPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: data
                });
            } else {
                alert('erreur lors de la récupération des données');
            }
        },
        error: function () {
            alert('omg erreur');
            return false;
        }
    });
}

function toggleElementSinglePage(input)
{
    var element;

    if($(input).data('page') === "graph") {
        element = '#chartDiv';
    }
    else if($(input).data('page') === "form") {
        element = '#formAjout';
    }
    else {
        element = '#containerTable';
    }

    $('[data-role="elementSinglePage"]').each(function () {
        if(!$(this).hasClass('dnone')) {
            $(this).addClass('dnone');
        }
    });

    $('[data-role="linkNavbar"]').removeClass('active');
    $(input).addClass('active');

    $(element).removeClass('dnone');
}