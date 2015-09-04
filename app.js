(function(){
    'use strict';

    var express = require('express');
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');

    /**
     * Instancia da aplicação
     */
    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride());

    /**
     * Logo de erros do servidor
     */
    var error = require('./server/error')(app);

    /**
     * Configurações padrão
     */
    var boostrap = require('./server/bootstrap')(app);

    /**
     * Configurações de sessão
     */
    var session = require('./server/session')(app);

    /**
     * Configurações do banco de dados
     */
    var database = require('./server/database')(app);

    /**
     * Configurações de diretórios dos assets
     */
    var assets = require('./server/assets')(app, express);

    /**
     * Configurações de views
     */
    var view = require('./server/view')(app);

    /**
     * Definição das entidades
     */
    var entity = require('./server/entity')(app);

    /**
     * Definição dos controllers
     */
    var controller = require('./server/controller')(app);

    /**
     * Pagina não encontrata 404
     */
    var notfound = require('./server/error/404')(app);

    /**
     * Inicialização do servidor
     * @type {http.Server}
     */
    var server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Host http://%s:%s', host, port);
    });

    return server;
})();