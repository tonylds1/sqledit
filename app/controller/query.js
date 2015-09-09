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

        return app;
    }

})();