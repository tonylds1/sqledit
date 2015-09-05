(function(){
    'use strict';

    /**
     * @module server/entity
     * @param {Object} app - instancia da app
     * @return {Object} app - instancia da app
     */
    module.exports = function (app) {
        var path   = require('path');
        var dir    = path.join(path.dirname(__dirname), 'app/entity/');

        //Entity User
        require(dir + 'user')(app);

        return app;
    }

})();