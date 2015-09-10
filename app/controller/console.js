(function(){
    'use strict';

    /**
     * @module app/controller/console
     * @param {Object} app - instancia da app
     * @return {Object} app - instancia da app
     */
    module.exports = function (app) {

        /**
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/console', function (request, response) {
            app.models.database.find({}).exec(function findOneCB(error, model){
                return response.render('console/index', {
                    database: model
                });
            });
        });

        return app;
    }

})();