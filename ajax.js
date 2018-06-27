function envoieAjax(param) {
    param['url'] = "http://192.168.43.238:8888/ProjetMongo/src/routeur/" + param['url'];
    param['datatype'] = "json";
    $.ajax(param);
}

function toggleFormAjout() {
    $('#containerTable, #formAjout').toggleClass('dnone');
}

function createData() {
    $('#cache').toggleClass('dnone');

    var data = {},
        form = $('#formAjout');

    form.serializeArray().map(function (x) {
        var res = x.name.split('$$');
        if (typeof data[res[0]] === "undefined") {
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
        success: function (data) {
            if (parseInt(data.status) !== 1) {
                alert('Error ' + data.status + ' : ' + data.message);
            }
            else {
                $('input').val('');
                alert('Success : ' + data.message);
            }
        },
        complete: function () {
            $('#cache').toggleClass('dnone');
        }
    });

    return false;
}

/**
 * @todo
 * {string} id
 */
function modifElem(id) {
    $('#cache').toggleClass('dnone');
    envoieAjax({
        type: 'PUT',
        url: id + "/updateData",
        data: {},
        success: function (data) {
            if (parseInt(data.status) !== 1) {
                alert('Error ' + data.status + ' : ' + data.message);
            }
            else {
                alert('Success : ' + data.message);
            }
        },
        complete: function () {
            $('#cache').toggleClass('dnone');
        }
    });
}

/**
 * {string} id
 */
function supprElement(id) {
    $('#cache').toggleClass('dnone');
    envoieAjax({
        type: 'DELETE',
        url: id + "/removeData",
        success: function (data) {
            if (parseInt(data.status) !== 1) {
                alert('Error ' + data.status + ' : ' + data.message);
            }
            else {
                alert('Success : ' + data.message);
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
                labels.push(elem._id.name);
            })
            result.datasets = datasets;
            result.labels = labels;
            var ctx = $('#cmsChart');
            if(result !== false) {
                const data = {
                    datasets: [{
                        data: result.datasets
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