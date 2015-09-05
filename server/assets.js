(function(){
    'use strict';

    /**
     * @module server/assets
     * @param {Object} app - instancia da app
     * @param {Object} express - instancia do express
     * @return {Object} app - instancia da app
     */
    module.exports = function (app, express) {
        var path = require('path');
        var minify = require('express-minify');
        var compression = require('compression');
        var dir = path.join(path.dirname(__dirname), 'app/assets/');

        app.use(compression());
        app.use(minify());
        app.use(express.static(dir));

        return app;
    }

})();