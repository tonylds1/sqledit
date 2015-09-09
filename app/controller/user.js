(function(){
    'use strict';

    /**
     * @module app/controller/user
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
        app.get('/user', function (request, response) {
            return response.render('user/index');
        });

        /**
         * Index
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/', function (request, response) {
            return response.render('user/login');
        });

        /**
         * Signup
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/user/signup', function (request, response) {
            return response.render('user/signup');
        });

        /**
         * Auth
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.post('/user/auth', function (request, response) {
            app.models.user.findOne({username: request.body.username}).exec(function findOneCB(error, model){
                if(error){
                    request.flash('danger', 'Ocorreu uma falha no sistema');
                    return response.redirect('/');
                }

                if(!model){
                    request.flash('danger', 'Usuário ou senha incorreto');
                    return response.redirect('/');
                }

                app.get('bcrypt').compare(request.body.password, model.password, function(error, result) {
                    if(error){
                        request.flash('danger', 'Ocorreu uma falha no sistema');
                        return response.redirect('/');
                    }

                    if(!result){
                        request.flash('danger', 'Usuário ou senha incorreto');
                        return response.redirect('/');
                    }

                    request.session.user = {
                        logged: true,
                        admin: result.admin
                    };

                    return response.redirect('/console');
                });
            });
        });

        /**
         * Create
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.post('/user/create', function (request, response) {

            app.models.access.findOne({username: request.body.username}).exec(function findOneCB(error, model){
                if(error){
                    request.flash('danger', 'Ocorreu uma falha no sistema');
                    return response.redirect('/');
                }

                if(!model){
                    request.flash('danger', 'Solicite permissão de cadastro a um administrador');
                    return response.redirect('/user/signup');
                }

                app.get('bcrypt').genSalt(10, function(err, salt) {
                    app.get('bcrypt').hash(request.body.password, salt, function(err, hash) {
                        var data = {
                            username: request.body.username,
                            password: hash
                        };

                        app.models.user.create(data, function(error, model) {
                            if(error){
                                request.flash('danger', 'Ocorreu uma falha no sistema');
                                return response.redirect('/');
                            }

                            request.flash('success', 'Cadastro realizado com sucesso');
                            return response.redirect('/');
                        });
                    });
                });

            });



        });

        return app;
    }

})();