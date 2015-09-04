(function(){
    'use strict';

    /**
     * @module server/error
     * @param {Object} app - instancia da app
     */
    module.exports = function (app) {

        /**
         * @param {Object} error
         * @param {Object} request
         * @param {Object} response
         * @param {Object} next
         * @returns {*}
         */
        function handle(error, request, response, next) {
            if (response.headersSent) {
                return next(error);
            }

            response.status(500);
            return response.render('error', { error: error });
        }

        /**
         * @param {Object} error
         * @param {Object} request
         * @param {Object} response
         * @param {Object} next
         * @returns next
         */
        function log(error, request, response, next) {
            console.error(error.stack);
            return next(error);
        }

        app.use(log);
        app.use(handle);

        return app;
    }

})();