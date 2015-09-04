(function(){
    'use strict';

    /**
     * @module server/session
     * @param {Object} app - instancia da app
     */
    module.exports = function (app) {
        var session = require('express-session');

        app.set('trust proxy', 1);
        app.use(session({
            secret: '11b120274fc8474aa312b5e46c473aa3',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: true
            }
        }));

        return app;
    }

})();