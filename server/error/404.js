(function(){
    'use strict';

    /**
     * @module server/error/404
     * @param {Object} app - instancia da app
     */
    module.exports = function (app) {
        /**
         *
         * @param {Object} request
         * @param {Object} response
         * @param {Object} next
         */
        function notfound(request, response, next) {
            response.status(404);

            // Response html
            if (request.accepts('html')) {
                return response.render('error/404', { url: request.url });
            }

            //Response Json
            if (request.accepts('json')) {
                return response.send({ error: 'Not found' });
            }

            //Response txt
            return response.type('txt').send('Not found');
        }

        app.use(notfound);

        return app;
    }

})();