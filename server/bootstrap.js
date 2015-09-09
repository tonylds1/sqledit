(function(){
    'use strict';

    /**
     * @module server/bootstrap
     * @param {Object} app - instancia da app
     */
    module.exports = function (app) {

        /**
         * @param {Object} request
         * @param {Object} response
         * @param {Object} next
         * @returns next
         */
        app.use(function (request, response, next) {
            response.locals.appName = 'Sql Edit';
            response.locals.appVersion = '1.0.0';
            response.locals.moment = require('moment');
            next();
        });

        return app;
    }

})();