'use strict';

module.exports = (app, options) => {
    app.get('/tradies', (req, res, next) => {
        options.repository.getTradies().then((tradies) => {
            res.status(200).send(tradies.map((tradie) => {
                return {
                    id: tradie.id,
                    name: tradie.name,
                    email: tradie.email,
                    mobile: tradie.mobile
                };
            }));
        }).catch(next);
    });

    app.get('/tradies', (req, res, next) => {
         var id = req.query.id;
         if (!id) {
             throw new Error("Searching for a tradie, the id must be specified, e.g: '/tradies?id=1'.");
         }
         options.repository.getTradieById(id).then((tradie) => {
             if (!tradie) {
                 res.status(404).send('Tradie not found.');
             } else {
                 res.status(200).send({
                     id: tradie.id,
                     name: tradie.name,
                     email: tradie.email,
                     mobile: tradie.mobile
                 });
             }
         }).catch(next);
     });
};