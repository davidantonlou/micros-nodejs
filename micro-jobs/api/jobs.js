'use strict';

module.exports = (app, options) => {

    // POST job
    app.post('/jobs', (req, res) => {
        var postcode = req.body.postcode;
        var category = req.body.category;
        var description = req.body.description;
        var customer = req.body.customer;
        var email = req.body.email;
        var mobile = req.body.mobile;
        options.repository.createJob(postcode, category, description, customer, email, mobile).then((job) => {
            if (!job) {
                res.status(404).send('Error creating job.');
            } else {
                res.status(200).send({
                    id: job.id,
                    postcode: job.postcode,
                    category: job.category,
                    description: job.description,
                    customer: job.customer,
                    email: job.email,
                    mobile: job.mobile,
                    status: job.status
                });
            }
        });
    });

    // POST assignment
    app.post('/jobs/assignment', (req, res) => {
        var id_job = req.body.id_job;
        var id_tradie = req.body.id_tradie;
        var assigned = false;
        options.repository.getJobAssignments(id_job).then((assignments) => {
            if (assignments) {
                for (var i in assignments) {
                    if (!assignments.hasOwnProperty(i)) continue;
                    if (assignments[i].status == "Hired"){
                        res.status(200).send('Job status is hired.');
                        assigned = true;
                        break;
                    } else if (assignments[i].id_tradie == id_tradie){
                        res.status(200).send('Tradie already assigned to this job.');
                        assigned = true;
                        break;
                    } 
                }
            }
        });
        if (!assigned) {
            options.repository.assignTradie(id_job, id_tradie,"New").then((job) => {
                if (!job) {
                    res.status(404).send('Error assigning tradie to job.');
                } else {
                    res.status(200).send({
                        id_job: job.id_job,
                        id_tradie: job.id_tradie,
                        status: job.status
                    });
                }
            });
        }
    });

    // POST hired
    app.post('/jobs/hired', (req, res) => {
        var id_job = req.body.id_job;
        var id_tradie = req.body.id_tradie;
        var finded = false;

        options.repository.getJobAssignments(id_job).then((assignments) => {
            if (assignments) {
                for (var i in assignments) {
                    if (!assignments.hasOwnProperty(i)) continue;
                    if (assignments[i].status == "Hired") {
                        res.status(200).send('Job status is hired.');
                        break;
                    } else if (assignments[i].id_tradie == id_tradie) {
                        finded=true;
                        options.repository.markAsHired(id_job, id_tradie).then((job) => {
                            if (!job) {
                                res.status(404).send('Error changing status.');
                            } else {
                                res.status(200).send({
                                    id_job: job.id_job,
                                    id_tradie: job.id_tradie,
                                    status: job.status
                                });
                            }
                        });
                        break;
                    }
                }
            } 
            if (!finded){
                res.status(200).send('Error, no tradie assigned to this job.');
            }
        });
    });

    // GET all jobs
    app.get('/jobs', (req, res, next) => {
        options.repository.getJobs().then((jobs) => {
            res.status(200).send(jobs.map((job) => {
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
        }).catch(next);
    });

    // GET job by id
     app.get('/job', (req, res, next) => {
         var id = req.query.id;
         if (!id) {
             throw new Error("Searching for a job, the id must be specified, e.g: '/jobs?id=1'.");
         }
         options.repository.getJobById(id).then((job) => {
             if (!job) {
                 res.status(404).send('Job not found.');
             } else {
                 res.status(200).send({
                     id: job.id,
                     postcode: job.postcode,
                     category: job.category,
                     description: job.description,
                     customer: job.customer,
                     email: job.email,
                     mobile: job.mobile,
                     status: job.status
                  });
             }
         }).catch(next);
     });

    // GET all assignments
    app.get('/jobs/assignments', (req, res, next) => {
        options.repository.getAssignments().then((assignments) => {
            res.status(200).send(assignments.map((assignment) => {
                return {
                    id_job: assignment.id_job,
                    id_tradie: assignment.id_tradie,
                    status: assignment.status
                };
            }));
        }).catch(next);
    });

    // GET assignments by job
    app.get('/jobs/assignments', (req, res, next) => {
        var id_job = req.query.id_job;
        if (!id_job) {
            throw new Error("Searching for job assignments, the id_job must be specified, e.g: '/jobs/assignments?id_job=1'.");
        }
        options.repository.getJobAssignments(id_job).then((assignments) => {
            if (!assignments) {
                res.status(404).send('Job assignments not found.');
            } else {
                res.status(200).send(assignments.map((assignment) => {
                    return {
                        id_job: assignment.id_job,
                        id_tradie: assignment.id_tradie,
                        status: assignment.status
                    };
                }));
            }
        }).catch(next);
    });
};