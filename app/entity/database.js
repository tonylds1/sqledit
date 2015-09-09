(function(){
    'use strict';

    /**
     * @module app/entity/database
     * @param {Object} app - instancia da app
     * @return {Object} app - instancia da app
     */
    module.exports = function (app) {
        var model = app.get('waterline').Collection.extend({
            identity: 'database',
            connection: 'default',
            attributes: {
                id: {
                    type: 'integer',
                    autoIncrement: true,
                    primaryKey: true,
                    unique: true
                },
                name: {
                    type: 'string',
                    required: true
                },
                host: {
                    type: 'string',
                    required: true
                },
                port: {
                    type: 'string',
                },
                user: {
                    type: 'string',
                    required: true
                },
                pass: {
                    type: 'string',
                    required: true
                },
                db: {
                    type: 'string',
                    required: true
                },
                driver: {
                    type: 'string',
                    required: true
                }
            }
        });

        app.get('orm').loadCollection(model);

        return app;
    }
})();




