(function(){
    'use strict';

    /**
     * @module app/controller/access
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
        app.get('/access', function (request, response) {

            app.models.access.find({}).sort({createdAt: 'desc' }).exec(function(error, model){
                return response.render('access/index', {
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
        app.get('/access/view/:id', function (request, response) {

            app.models.access.findOne({id: request.params.id}, function(error, model){
                if(error){
                    request.flash('danger', 'Erro ao tentar visualizar registro');
                    return response.redirect('/access');
                }

                if(!model){
                    request.flash('danger', 'Erro, registro inexistente');
                    return response.redirect('/access');
                }

                return response.render('access/view', {
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
        app.get('/access/add', function (request, response) {
            return response.render('access/add');
        });

        /**
         * Edit
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/access/edit/:id', function (request, response) {

            app.models.access.findOne({id: request.params.id}, function(error, model){
                if(error){
                    request.flash('danger', 'Erro ao tentar visualizar registro');
                    return response.redirect('/access');
                }

                if(!model){
                    request.flash('danger', 'Erro, registro inexistente');
                    return response.redirect('/access');
                }

                return response.render('access/edit', {
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
        app.post('/access/create', function (request, response) {
            app.models.access.create(request.body, function(error, model) {
                if(error){
                    request.flash('danger', 'Falha ao tentar realizar cadastro');
                    return response.redirect('/access/add');
                }

                request.flash('success', 'Cadastro realizado com sucesso');
                return response.redirect('/access/add');
            });
        });

        /**
         * Update
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.post('/access/update', function (request, response) {
            app.models.access.update({id: request.body.id}, request.body).exec(function (error, model){
                if(error){
                    request.flash('danger', 'Falha ao tentar atualizar registro');
                    return response.redirect('/access/edit/' + request.body.id);
                }

                request.flash('success', 'Registro atualizado com sucesso');
                return response.redirect('/access/edit/' + request.body.id);
            });
        });

        /**
         * Remove
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/access/remove/:id', function (request, response) {

            app.models.access.findOne({id: request.params.id}, function(error, model){
                if(error){
                    request.flash('danger', 'Falha ao tentar remover registro');
                    return response.redirect('/access');
                }

                if(!model){
                    request.flash('danger', 'Erro, registro inexistente');
                    return response.redirect('/access');
                }

                app.models.access.destroy({id: request.params.id}).exec(function(error, model) {
                    if(error){
                        request.flash('danger', 'Falha ao tentar remover registro');
                        return response.redirect('/access');
                    }

                    request.flash('success', 'Registro removido com sucesso');
                    return response.redirect('/access');
                });
            });
        });

        return app;
    }

})();