(function(){
    'use strict';

    /**
     * @module app/controller/query
     * @param {Object} app - instancia da app
     * @return {Object} app - instancia da app
     */
    module.exports = function (app) {

        /**
         * Index
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/query', function (request, response) {

            app.models.query.find({}).sort({createdAt: 'desc' }).exec(function(error, model){
                return response.render('query/index', {
                    grid: model
                });
            });

        });

        /**
         * View
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/query/view/:id', function (request, response) {

            app.models.query.findOne({id: request.params.id}, function(error, model){
                if(error){
                    request.flash('danger', 'Erro ao tentar visualizar registro');
                    return response.redirect('/query');
                }

                if(!model){
                    request.flash('danger', 'Erro, registro inexistente');
                    return response.redirect('/query');
                }

                return response.render('query/view', {
                    model: model
                });
            });
        });

        /**
         * Add
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/query/add', function (request, response) {
            app.models.category.find({}).exec(function findOneCB(error, model){
                return response.render('query/add', {
                    category: model
                });
            });
        });

        /**
         * Edit
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/query/edit/:id', function (request, response) {

            app.models.query.findOne({id: request.params.id}, function(error, model){
                if(error){
                    request.flash('danger', 'Erro ao tentar visualizar registro');
                    return response.redirect('/query');
                }

                if(!model){
                    request.flash('danger', 'Erro, registro inexistente');
                    return response.redirect('/query');
                }

                app.models.category.find({}).exec(function findOneCB(error, category){
                    return response.render('query/edit', {
                        model: model,
                        category: category
                    });
                });
            });
        });


        /**
         * Create
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.post('/query/create', function (request, response) {
            app.models.query.create(request.body, function(error, model) {
                if(error){
                    request.flash('danger', 'Falha ao tentar realizar cadastro');
                    return response.redirect('/query/add');
                }

                request.flash('success', 'Cadastro realizado com sucesso');
                return response.redirect('/query/add');
            });
        });

        /**
         * Update
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.post('/query/update', function (request, response) {
            app.models.query.update({id: request.body.id}, request.body).exec(function (error, model){
                if(error){
                    request.flash('danger', 'Falha ao tentar atualizar registro');
                    return response.redirect('/query/edit/' + request.body.id);
                }

                request.flash('success', 'Registro atualizado com sucesso');
                return response.redirect('/query/edit/' + request.body.id);
            });
        });

        /**
         * Remove
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/query/remove/:id', function (request, response) {

            app.models.query.findOne({id: request.params.id}, function(error, model){
                if(error){
                    request.flash('danger', 'Falha ao tentar remover registro');
                    return response.redirect('/query');
                }

                if(!model){
                    request.flash('danger', 'Erro, registro inexistente');
                    return response.redirect('/query');
                }

                app.models.query.destroy({id: request.params.id}).exec(function(error, model) {
                    if(error){
                        request.flash('danger', 'Falha ao tentar remover registro');
                        return response.redirect('/query');
                    }

                    request.flash('success', 'Registro removido com sucesso');
                    return response.redirect('/query');
                });
            });
        });

        /**
         * Run
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.post('/query/run', function (request, response) {
            var path    = require('path');
            var dir     = path.join(path.dirname(__dirname), 'adapter/');
            var adapter = '';

            app.models.database.findOne({id: request.body.database}, function(error, database) {
                if (database) {
                    var options = {
                        host: database.host,
                        port: database.port,
                        user: database.user,
                        password: database.pass,
                        database: database.db
                    };

                    var content = request.body.content.toLowerCase();
                    var adapter = require(dir + database.driver);

                    adapter.doCall(options, content, function(data) {
                        return response.json(data);
                    });
                }

            });

        });

        return app;
    }

})();