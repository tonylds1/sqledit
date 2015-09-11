(function(){
    'use strict';

    /**
     * @module app/adapter/postgresql
     * @return {Object}  module.exports
     */
    module.exports = {
        doCall: function(options, query, callback){
            var pg = require('pg');
            var conString = "postgres://" + options.user + ":" + options.password + "@" + options.host + ":" + options.port + "/" + options.database;

            pg.connect(conString, function(error, client, done) {
                if(error){
                    return callback({
                        error: error
                    });
                }

                client.query("" + query + "", function(error, rows) {
                    done();
                    if(error){
                        return callback({
                            error: error
                        });
                    }

                    return callback({
                        rows: rows.rows,
                        fields: rows.fields
                    });
                });

            });
        }
    };

    return module.exports;

})();