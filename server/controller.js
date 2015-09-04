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

        //Controller Default
        require(dir + 'console')(app);

        return app;
    }

})();