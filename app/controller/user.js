(function(){
    'use strict';

    /**
     * @module app/controller/user
     * @param {Object} app - instancia da app
     * @return {Object} app - instancia da app
     */
    module.exports = function (app) {

        /**
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/user', function (request, response) {
            return response.render('user/index');
        });

        return app;
    }

})();