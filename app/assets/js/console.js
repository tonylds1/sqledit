(function(){
    'use strict';

    var mime = 'text/x-sql';

    if (window.location.href.indexOf('mime=') > -1) {
        mime = window.location.href.substr(window.location.href.indexOf('mime=') + 5);
    }

    $('.console').each(function(index) {
        CodeMirror.fromTextArea($(this).context, {
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
            lineWrapping: true,
            thema: 'monokai'
        });
    });

    $('.console-submit').on('submit', function(event){
        event.preventDefault();

        //form
        var action = $(this).attr('action');
        var method = $(this).attr('method');
        var data   = $(this).serialize();

        jQuery.ajax({
            type: method,
            url: action,
            data: data,
            beforeSend: function() {
                $('#wait-message').modal('toggle');
            },
            success: function(data) {
               console.log(data);
            },
            complete: function() {
                $('#wait-message').modal('toggle');
            }
        });

    });

})();