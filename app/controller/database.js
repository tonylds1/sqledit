(function(){
    'use strict';

    /**
     * @module app/controller/database
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
        app.get('/database', function (request, response) {

            app.models.database.find({}).sort({createdAt: 'desc' }).exec(function(error, model){
                return response.render('database/index', {
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
        app.get('/database/view/:id', function (request, response) {

            app.models.database.findOne({id: request.params.id}, function(error, model){
                if(error){
                    request.flash('danger', 'Erro ao tentar visualizar registro');
                    return response.redirect('/database');
                }

                if(!model){
                    request.flash('danger', 'Erro, registro inexistente');
                    return response.redirect('/database');
                }

                return response.render('database/view', {
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
        app.get('/database/add', function (request, response) {
            return response.render('database/add');
        });

        /**
         * Edit
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/database/edit/:id', function (request, response) {

            app.models.database.findOne({id: request.params.id}, function(error, model){
                if(error){
                    request.flash('danger', 'Erro ao tentar visualizar registro');
                    return response.redirect('/database');
                }

                if(!model){
                    request.flash('danger', 'Erro, registro inexistente');
                    return response.redirect('/database');
                }

                return response.render('database/edit', {
                    model: model
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
        app.post('/database/create', function (request, response) {
            app.models.database.create(request.body, function(error, model) {
                if(error){
                    request.flash('danger', 'Falha ao tentar realizar cadastro');
                    return response.redirect('/database/add');
                }

                request.flash('success', 'Cadastro realizado com sucesso');
                return response.redirect('/database/add');
            });
        });

        /**
         * Update
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.post('/database/update', function (request, response) {
            app.models.database.update({id: request.body.id}, request.body).exec(function (error, model){
                if(error){
                    request.flash('danger', 'Falha ao tentar atualizar registro');
                    return response.redirect('/database/edit/' + request.body.id);
                }

                request.flash('success', 'Registro atualizado com sucesso');
                return response.redirect('/database/edit/' + request.body.id);
            });
        });

        /**
         * Remove
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/database/remove/:id', function (request, response) {

            app.models.database.findOne({id: request.params.id}, function(error, model){
                if(error){
                    request.flash('danger', 'Falha ao tentar remover registro');
                    return response.redirect('/database');
                }

                if(!model){
                    request.flash('danger', 'Erro, registro inexistente');
                    return response.redirect('/database');
                }

                app.models.database.destroy({id: request.params.id}).exec(function(error, model) {
                    if(error){
                        request.flash('danger', 'Falha ao tentar remover registro');
                        return response.redirect('/database');
                    }

                    request.flash('success', 'Registro removido com sucesso');
                    return response.redirect('/database');
                });
            });
        });

        return app;
    }

})();