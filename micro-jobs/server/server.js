var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports.start = (options) => {
    return new Promise((resolve, reject) => {
        if (!options.repository) throw new Error("A server must be started with a connected repository.");
        if (!options.port) throw new Error("A server must be started with a port.");

        var app = express();
        app.use(morgan('dev'));
        app.use(bodyParser.urlencoded({ extended: false }));

        require('../api/jobs')(app, options);

        //  Start the app
        var server = app.listen(options.port, () => {
            resolve(server);
        });

    });
};