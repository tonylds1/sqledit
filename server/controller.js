(function(){
    'use strict';

    /**
     * @module server/controller
     * @param {Object} app - instancia da app
     * @return {Object} app - instancia da app
     */
    module.exports = function (app) {
        var path   = require('path');
        var dir    = path.join(path.dirname(__dirname), 'app/controller/');

        //Controller User
        require(dir + 'user')(app);

        //Controller Console
        require(dir + 'console')(app);

        //Controller Access
        require(dir + 'access')(app);

        //Controller Category
        require(dir + 'category')(app);

        return app;
    }

})();