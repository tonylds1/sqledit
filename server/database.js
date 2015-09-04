(function(){
    'use strict';

    /**
     * @module server/database
     * @param {Object} app - instancia da app
     * @return Object} app - instancia da app
     */
    module.exports = function (app) {

        var waterline   = require('waterline');
        var mysql       = require('sails-mysql');
        var postgresql  = require('sails-postgresql');
        var mongodb     = require('sails-mongo');

        var config = {
            adapters: {
                mysql: mysql,
                postgresql: postgresql,
                mongodb: mongodb
            },
            connections: {
                default: {
                    adapter: 'mysql',
                    host: 'localhost',
                    user: 'root',
                    port: 3306,
                    password: 'root',
                    database: 'sqlpad'
                }
            }
        };

        app.set('adapter', config);
        app.set('waterline', waterline);
        app.set('orm', new waterline());

        return app;
    }

})();