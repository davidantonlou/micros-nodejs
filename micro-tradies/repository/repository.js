'use strict';

var mysql = require('mysql');

class Repository {
    constructor(connection) {
        this.connection = connection;
    }

    getTradies() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM tradies', (err, results) => {
                if (err) {
                    return reject(new Error('An error occured getting the tradies: ' + err));
                }
                resolve((results || []).map((tradie) => {
                    return {
                        id: tradie.id,
                        name: tradie.name,
                        email: tradie.email,
                        mobile: tradie.mobile
                    };
                }));
            });
        });
    }

    getTradieById(id) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM tradies WHERE id = ?', [id], (err, results) => {
                if (err) {
                    return reject(new Error('An error occured getting the tradie: ' + err));
                }
                if (results.length === 0) {
                    resolve(undefined);
                } else {
                    resolve({
                        name: results[0].name,
                        email: results[0].email,
                        mobile: results[0].mobile
                    });
                }
            });
        });
    }

    disconnect() {
        this.connection.end();
    }
}

module.exports.connect = (connectionSettings) => {
    return new Promise((resolve, reject) => {
        if (!connectionSettings.host) throw new Error("A host must be specified.");
        if (!connectionSettings.user) throw new Error("A user must be specified.");
        if (!connectionSettings.password) throw new Error("A password must be specified.");
        if (!connectionSettings.port) throw new Error("A port must be specified.");

        resolve(new Repository(mysql.createConnection(connectionSettings)));
    });
};