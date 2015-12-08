/* ------------------------------------------------------------------------- *\
	 						    ROUTES Recruiters
\* ------------------------------------------------------------------------- */

var Recruiter = require('../models/recruiter.js');
var Auth = require('../middlewares/authorization.js');

module.exports = function (app, passport) {

    app.get('/recruiters/id/:id', Recruiter.findById);

    app.get('/recruiters/email', Recruiter.findByEmail);

    app.get('/recruiters/:type', Recruiter.findByType);

    app.get('/recruiters', Recruiter.findAll);

    app.post('/recruiters', Recruiter.create);

    app.put('/recruiters/:id', Recruiter.update);

    app.delete('/recruiters/:id', Recruiter.delete);

}