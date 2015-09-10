(function(){
    'use strict';

    /**
     * @module app/entity/category
     * @param {Object} app - instancia da app
     * @return {Object} app - instancia da app
     */
    module.exports = function (app) {
        var model = app.get('waterline').Collection.extend({
            identity: 'category',
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
                description: {
                    type: 'string'
                },
                query: {
                    collection: 'query',
                    via: 'category'
                }
            }
        });

        app.get('orm').loadCollection(model);

        return app;
    }
})();




