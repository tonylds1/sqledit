(function(){
    'use strict';

    /**
     * @module server/bootstrap
     * @param {Object} app - instancia da app
     */
    module.exports = function (app) {
        var bcrypt = require('bcrypt');
        app.set('bcrypt', bcrypt);

        /**
         * @param {Object} request
         * @param {Object} response
         * @param {Object} next
         * @returns next
         */
        app.use(function (request, response, next) {
            response.locals.app = {
                name: 'Sqledit',
                version: '1.0.0'
            };

            next();
        });

        return app;
    }

})();