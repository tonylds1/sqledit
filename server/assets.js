(function(){
    'use strict';

    /**
     * @module server/assets
     * @param {Object} app - instancia da app
     * @param {Object} express - instancia do express
     */
    module.exports = function (app, express) {
        app.use(express.static('./assets'));
        return app;
    }

})();