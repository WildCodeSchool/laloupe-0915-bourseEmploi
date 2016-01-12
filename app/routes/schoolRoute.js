/* ------------------------------------------------------------------------- *\
	 						    ROUTES SCHOOL
\* ------------------------------------------------------------------------- */

var School = require('../models/school.js');
var Auth = require('../middlewares/authorization.js');

module.exports = function (app, passport) {

    app.get('/api/school', Auth.user.hasAuthorization, School.findAll);

    app.get('/api/school/:id', Auth.user.hasAuthorization, School.findById);

    app.post('/api/school', Auth.user.hasAuthorization, School.create);

    app.put('/api/school/:id', Auth.user.hasAuthorization, School.update);

    app.delete('/api/school/:id', Auth.user.hasAuthorization, School.delete);

}