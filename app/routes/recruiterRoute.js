/* ------------------------------------------------------------------------- *\
	 						    ROUTES Recruiters
\* ------------------------------------------------------------------------- */

var Recruiter = require('../models/recruiter.js');
var Auth = require('../middlewares/authorization.js');

module.exports = function (app, passport) {

    // CETTE ROUTE EST COMMUNUNE ENTRE Recruteur et Student (a revoir peut être)
    app.get('/api/users/recruiters', Auth.user.hasAuthorization, Recruiter.findByType);

    app.get('/api/recruiters/email', Recruiter.findByEmail);

    app.get('/api/recruiters/:id', Auth.user.hasAuthorization, Recruiter.findById);

    app.post('/api/recruiters', Recruiter.create);

    app.put('/api/recruiters/:id', Auth.user.hasAuthorization, Recruiter.update);

    app.delete('/api/recruiters/:id', Auth.user.hasAuthorization, Recruiter.delete);

}