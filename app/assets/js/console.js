(function(){
    'use strict';

    var mime = 'text/x-sql';

    if (window.location.href.indexOf('mime=') > -1) {
        mime = window.location.href.substr(window.location.href.indexOf('mime=') + 5);
    }

    var instance = new Array();

    $('.console').each(function(index) {
        instance.push(CodeMirror.fromTextArea($(this).context, {
            mode: mime,
            indentWithTabs: true,
            smartIndent: true,
            lineNumbers: true,
            matchBrackets : true,
            extraKeys: {"Ctrl-Space": "autocomplete"},
            hintOptions: {tables: {
                users: {name: null, score: null, birthDate: null},
                countries: {name: null, population: null, size: null}
            }},
            styleActiveLine: true,
            lineWrapping: true
        }));
    });

    console.log(instance);

    $('.console-submit').on('submit', function(){
        var action = $(this).attr('action');
        var method = $(this).attr('method');
        var output = $(this).attr('data-console-output');
        var data   = $(this).serialize();

        $.ajax({
            type: method,
            url: action,
            data: data,
            beforeSend: function() {
                $('#wait-message').modal('toggle');
            },
            success: function(data) {
                if(data.error){
                    var text  = 'Erro: ' + data.error.code;
                    alert(text);
                    return false;
                }

                $('#' + output + ' thead tr').html('');

                $.each(data.fields, function(index, val) {
                    $('#' + output + ' thead tr').append('<th>' + val.name + '</th>');
                });

                var dynatable = $('#' + output).dynatable({
                    dataset: {
                        records: data.rows
                    },
                    features: {
                        paginate: false,
                        search: false,
                        recordCount: false,
                        perPageSelect: false
                    }
                }).data('dynatable');

                dynatable.settings.dataset.originalRecords = data.rows;
                dynatable.process();

                return false;
            },
            complete: function() {
                $('#wait-message').modal('toggle');
            }
        });

        return false;
    });

    /**
     * Modal de carregar query
     */
    $('.load-query').on('click', function(){

        var form = $(this).attr('data-console-form');

        $('#load-query form').append('<input type="hidden" name="console" value="' + form + '">');

        $('#load-query').modal({
            show: 'false'
        });

        return false;
    });


    $('.form-search').on('submit', function(){
        var data = $(this).serialize();
        var action = $(this).attr('action');

        $.ajax({
            type: "POST",
            url: action,
            data: data,
            success: function(data) {
                var html = '';

                $('#output-query-search tbody').html('');
                $.each(data.model, function(index, value) {
                    var html  = '<tr>';
                    html += '<td>' + value.category.name + '</td>';
                    html += '<td>' + value.name + '</td>';
                    html += '<td>' + value.description + '</td>';
                    html += '<td> <a href="/query/selected/'+ value.category.id +'" class="query-selected">Selecionar <span class="glyphicon glyphicon-play"></span> </a></td>'
                    html += '</tr>';

                    $('#output-query-search tbody').append(html);
                });

                return false;
            }
        });
        return false;
    });

    $(document).on('click', '.query-selected', function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        var input = $('input[name="console"]').val();

        $.get(href, function(data) {
            var content = data.model.content;
            console.log($('#' + input));
            $('#' + input).val(content).trigger('keypress');
            return false;
        }, 'json');

        return false;
    });

    //Remove elementos ao fechar o modal
    $('#load-query').on('hidden.bs.modal', function () {
        $('input[name="console"]').remove();
    })

})();