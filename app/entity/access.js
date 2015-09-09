(function(){
    'use strict';

    /**
     * @module server/access
     * @param {Object} app - instancia da app
     * @return {Object} app - instancia da app
     */
    module.exports = function (app) {
        var model = app.get('waterline').Collection.extend({
            identity: 'access',
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
                }
            }
        });

        app.get('orm').loadCollection(model);

        return app;
    }
})();




