(function(){
    'use strict';

    /**
     * @module server/security
     * @param {Object} app - instancia da app
     * @return {Object} app - instancia da app
     */
    module.exports = function (app) {
        /**
         * @param {Object} request
         * @param {Object} response
         * @param {Object} next
         * @returns next, response
         */
        app.use(function (request, response, next) {
            if(request._parsedUrl.pathname === '/' || request._parsedUrl.pathname === '/user/auth' || request._parsedUrl.pathname === '/user/signup' || request._parsedUrl.pathname === '/user/create'){
                return next();
            }

            //Redireciona para a tela de login caso o usuário não esteja logado
            if(typeof request.session.user === 'undefined'){
                return response.redirect('/');
            }

            response.locals.user = request.session.user;
            return next();
        });

        return app;
    }

})();