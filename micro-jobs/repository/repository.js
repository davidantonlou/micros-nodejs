'use strict';

var mysql = require('mysql');

class Repository {
    constructor(connection) {
        this.connection = connection;
    }

    createJob(postcode, category, description, customer, email, mobile) {
        var values = [postcode, category, description, customer, email, mobile, 'new'];

        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO jobs(postcode, category, description, customer, email, mobile, status) values(?,?,?,?,?,?,?)', values, (err, results) => {
                if (err) {
                    return reject(new Error('An error occured inserting the job: ' + err));
                }

                if (results.length === 0) {
                    resolve(undefined);
                } else {
                    resolve({
                        id: results.insertId
                    });
                }
            });
        });
    }

    assignTradie(id_job, id_tradie, status) {
        var values = [id_job, id_tradie, status];

        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO assignments(id_job, id_tradie, status) values(?,?,?)', values, (err, results) => {
                if (err) {
                    return reject(new Error('An error occured doing the assignment: ' + err));
                }

                if (results.length === 0) {
                    resolve(undefined);
                } else {
                    resolve({
                        id_job: id_job,
                        id_tradie: id_tradie,
                        status: status
                    });
                }
            });
        });
    }

    markAsHired(id_job, id_tradie) {
        return new Promise((resolve, reject) => {
            this.connection.query('UPDATE jobs SET status = \'Hired\' WHERE id = ?', [id_job], (err, results) => {
                if (err) {
                    return reject(new Error('An error occured changing the status: ' + err));
                }
            });

            this.connection.query('UPDATE assignments SET status = \'Hired\' WHERE id_job = ? AND id_tradie = ?', [id_job, id_tradie], (err, results) => {
                if (err) {
                    return reject(new Error('An error occured changing the status: ' + err));
                }

                if (results.length === 0) {
                    resolve(undefined);
                } else {
                    resolve({
                        id_job: id_job,
                        id_tradie: id_tradie,
                        status: "Hired"
                    });
                }
            });
        });
    }

    getJobs() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM jobs', (err, results) => {
                if (err) {
                    return reject(new Error('An error occured getting the jobs: ' + err));
                }

                resolve((results || []).map((job) => {
                    return {
                        id: job.id,
                        postcode: job.postcode,
                        category: job.category,
                        description: job.description,
                        customer: job.customer,
                        email: job.email,
                        mobile: job.mobile,
                        status: job.status
                    };
                }));
            });
        });
    }

    getJobById(id) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM jobs WHERE id = ?', [id], (err, results) => {
                if (err) {
                    return reject(new Error('An error occured getting the job: ' + err));
                }

                if (results.length === 0) {
                    resolve(undefined);
                } else {
                    resolve({
                        id: results[0].id,
                        postcode: results[0].postcode,
                        category: results[0].category,
                        description: results[0].description,
                        customer: results[0].customer,
                        email: results[0].email,
                        mobile: results[0].mobile,
                        status: results[0].status
                    });
                }
            });
        });
    }

    getJobAssignments(id_job) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM assignments WHERE id_job = ?', [id_job], (err, results) => {
                if (err) {
                    return reject(new Error('An error occured getting the assignments for the job: ' + err));
                }

                if (results.length === 0) {
                    resolve(undefined);
                } else {
                    resolve((results || []).map((assignment) => {
                        return {
                            id_job: assignment.id_job,
                            id_tradie: assignment.id_tradie,
                            status: assignment.status
                        };
                    }));
                }
            });
        });
    }

    getAssignments() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM assignments', (err, results) => {
                if (err) {
                    return reject(new Error('An error occured getting the assignments: ' + err));
                }

                resolve((results || []).map((assignment) => {
                    return {
                        id_job: assignment.id_job,
                        id_tradie: assignment.id_tradie,
                        status: assignment.status
                    };
                }));
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