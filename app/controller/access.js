(function(){
    'use strict';

    /**
     * @module app/controller/access
     * @param {Object} app - instancia da app
     * @return {Object} app - instancia da app
     */
    module.exports = function (app) {

        /**
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/access', function (request, response) {

            app.models.access.find({}, function(error, model){
                return response.render('access/index', {
                    grid: model
                });
            });

        });

        /**
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.post('/access/create', function (request, response) {
            app.models.access.create(request.body, function(error, model) {
                if(error){
                    return response.json({
                        message: 'Falha ao tentar cadastrar',
                        error: error
                    });
                }

                return response.json({
                    message: 'Cadastro realizado com sucesso',
                    data: model
                });
            });
        });

        return app;
    }

})();