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

            app.models.user.find({}).sort({createdAt: 'desc' }).exec(function(error, model){
                return response.render('user/index', {
                    grid: model
                });
            });

        });

        /**
         * View
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/user/view/:id', function (request, response) {

            app.models.user.findOne({id: request.params.id}, function(error, model){
                if(error){
                    request.flash('danger', 'Erro ao tentar visualizar registro');
                    return response.redirect('/user');
                }

                if(!model){
                    request.flash('danger', 'Erro, registro inexistente');
                    return response.redirect('/user');
                }

                return response.render('user/view', {
                    model: model
                });
            });
        });

        /**
         * Add
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/user/add', function (request, response) {
            return response.render('user/add');
        });

        /**
         * Create
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.post('/user/create', function (request, response) {
            app.models.user.create(request.body, function(error, model) {
                if(error){
                    request.flash('danger', 'Falha ao tentar realizar cadastro');
                    return response.redirect('/user/add');
                }

                request.flash('success', 'Cadastro realizado com sucesso');
                return response.redirect('/user/add');
            });
        });

        /**
         * Edit
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/user/edit/:id', function (request, response) {

            app.models.user.findOne({id: request.params.id}, function(error, model){
                if(error){
                    request.flash('danger', 'Erro ao tentar visualizar registro');
                    return response.redirect('/user');
                }

                if(!model){
                    request.flash('danger', 'Erro, registro inexistente');
                    return response.redirect('/user');
                }

                return response.render('user/edit', {
                    model: model
                });
            });
        });

        /**
         * Update
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.post('/user/update', function (request, response) {
            app.models.user.update({id: request.body.id}, request.body).exec(function (error, model){
                if(error){
                    request.flash('danger', 'Falha ao tentar atualizar registro');
                    return response.redirect('/user/edit/' + request.body.id);
                }

                request.flash('success', 'Registro atualizado com sucesso');
                return response.redirect('/user/edit/' + request.body.id);
            });
        });

        /**
         * Remove
         *
         * @param {Object} request
         * @param {Object} response
         * @return {Object} response
         */
        app.get('/user/remove/:id', function (request, response) {

            app.models.user.findOne({id: request.params.id}, function(error, model){
                if(error){
                    request.flash('danger', 'Falha ao tentar remover registro');
                    return response.redirect('/user');
                }

                if(!model){
                    request.flash('danger', 'Erro, registro inexistente');
                    return response.redirect('/user');
                }

                app.models.user.destroy({id: request.params.id}).exec(function(error, model) {
                    if(error){
                        request.flash('danger', 'Falha ao tentar remover registro');
                        return response.redirect('/user');
                    }

                    request.flash('success', 'Registro removido com sucesso');
                    return response.redirect('/user');
                });
            });
        });



        /**
         * Signin
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

            app.models.user.findOne({username: request.body.username}).exec(function findOneCB(error, model){
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