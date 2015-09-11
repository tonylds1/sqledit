(function(){
    'use strict';

    /**
     * @module app/adapter/mysql
     * @return {Object}  module.exports
     */
    module.exports = {
        doCall: function(options, query, callback){
            var mysql = require('mysql');
            var connection = mysql.createConnection(options);

            connection.connect();
            connection.query(''+ query +'', function(error, rows, fields) {
                if(error){
                    return callback({
                        error: error
                    });
                }

                return callback({
                    rows: rows,
                    fields: fields
                });
            });
        }
    };

    return module.exports;

})();