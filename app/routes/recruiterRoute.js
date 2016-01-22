/* ------------------------------------------------------------------------- *\
	 						    ROUTES Recruiters
\* ------------------------------------------------------------------------- */

var Recruiter = require('../models/recruiter.js');
var Auth = require('../middlewares/authorization.js');

module.exports = function (app, passport) {

    app.get('/api/users/recruiters', Auth.user.hasAuthorization, Recruiter.findByType)

    app.get('/api/recruiters/email', Recruiter.findByEmail);

    app.get('/api/recruiters/:id', Auth.user.hasAuthorization, Recruiter.findById);

    app.post('/api/recruiters', Recruiter.create);

    app.put('/api/recruiters/:id', Auth.user.hasAuthorization, Recruiter.update);

    app.put('/api/like/recruiters/:id', Auth.user.hasAuthorization, Recruiter.like);

    app.put('/api/unlike/recruiters/:id', Auth.user.hasAuthorization, Recruiter.unlike);

    app.delete('/api/recruiters/:id', Auth.user.hasAuthorization, Recruiter.delete);

}