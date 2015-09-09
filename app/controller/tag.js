(function(){
    'use strict';

    /**
     * @module app/controller/tag
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
        app.get('/tag', function (request, response) {

            app.models.tag.find({}).sort({createdAt: 'desc' }).exec(function(error, model){
                return response.render('tag/index', {
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
        app.get('/tag/view/:id', function (request, response) {

            app.models.tag.findOne({id: request.params.id}, function(error, model){
                if(error){
                    request.flash('danger', 'Erro ao tentar visualizar registro');
                    return response.redirect('/tag');
                }

                if(!model){
                    request.flash('danger', 'Erro, registro inexistente');
                    return response.redirect('/tag');
                }

                return response.render('tag/view', {
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
        app.get('/tag/add', function (request, response) {
            return response.render('tag/add');
        });

        /**
         * Edit
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/tag/edit/:id', function (request, response) {

            app.models.tag.findOne({id: request.params.id}, function(error, model){
                if(error){
                    request.flash('danger', 'Erro ao tentar visualizar registro');
                    return response.redirect('/tag');
                }

                if(!model){
                    request.flash('danger', 'Erro, registro inexistente');
                    return response.redirect('/tag');
                }

                return response.render('tag/edit', {
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
        app.post('/tag/create', function (request, response) {
            app.models.tag.create(request.body, function(error, model) {
                if(error){
                    request.flash('danger', 'Falha ao tentar realizar cadastro');
                    return response.redirect('/tag/add');
                }

                request.flash('success', 'Cadastro realizado com sucesso');
                return response.redirect('/tag/add');
            });
        });

        /**
         * Update
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.post('/tag/update', function (request, response) {
            app.models.tag.update({id: request.body.id}, request.body).exec(function (error, model){
                if(error){
                    request.flash('danger', 'Falha ao tentar atualizar registro');
                    return response.redirect('/tag/edit/' + request.body.id);
                }

                request.flash('success', 'Registro atualizado com sucesso');
                return response.redirect('/tag/edit/' + request.body.id);
            });
        });

        /**
         * Remove
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/tag/remove/:id', function (request, response) {

            app.models.tag.findOne({id: request.params.id}, function(error, model){
                if(error){
                    request.flash('danger', 'Falha ao tentar remover registro');
                    return response.redirect('/tag');
                }

                if(!model){
                    request.flash('danger', 'Erro, registro inexistente');
                    return response.redirect('/tag');
                }

                app.models.tag.destroy({id: request.params.id}).exec(function(error, model) {
                    if(error){
                        request.flash('danger', 'Falha ao tentar remover registro');
                        return response.redirect('/tag');
                    }

                    request.flash('success', 'Registro removido com sucesso');
                    return response.redirect('/tag');
                });
            });
        });

        return app;
    }

})();