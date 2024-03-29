(function(){
    'use strict';

    /**
     * @module app/entity/entity
     * @param {Object} app - instancia da app
     * @return {Object} app - instancia da app
     */
    module.exports = function (app) {
        var model = app.get('waterline').Collection.extend({
            identity: 'user',
            connection: 'default',
            attributes: {
                id: {
                    type: 'integer',
                    autoIncrement: true,
                    primaryKey: true,
                    unique: true
                },
                username: {
                    type: 'string',
                    required: true
                },
                password: {
                    type: 'string',
                    required: true
                },
                admin: {
                    type: 'integer',
                    required: true,
                    defaultsTo: 0
                }
            }
        });

        app.get('orm').loadCollection(model);

        return app;
    }
})();




