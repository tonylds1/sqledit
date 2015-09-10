(function(){
    'use strict';

    /**
     * @module app/entity/tag
     * @param {Object} app - instancia da app
     * @return {Object} app - instancia da app
     */
    module.exports = function (app) {
        var model = app.get('waterline').Collection.extend({
            identity: 'query',
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
                content: {
                    type: 'string',
                    required: true
                },
                tags: {
                    type: 'string',
                },
                category: {
                    model: 'category'
                }
            }
        });

        app.get('orm').loadCollection(model);

        return app;
    }
})();




