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
            return response.render('console/index');
        });

        return app;
    }

})();