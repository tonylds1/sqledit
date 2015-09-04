(function(){
    'use strict';

    /**
     * @module server/view
     * @param {Object} app - instancia da app
     * @return {Object} app - instancia da app
     */
    module.exports = function (app) {
        var layout = require('express-ejs-layouts');
        var path   = require('path');

        app.set('views', path.join(path.dirname(__dirname), 'app/resource/views'));
        app.set('view engine', 'ejs');
        app.set('layout', 'base');
        app.use(layout);

        return app;
    }

})();